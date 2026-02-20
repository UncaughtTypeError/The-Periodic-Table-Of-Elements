import type { Element, ElementCategory, ThreatLevel } from '@/types';
import { getStandardState, isRadioactive } from '@/data';
import { RadioactiveIcon } from '@/components/common/icons';
import { stateIconMap } from '@/components/common/stateIconMap';
import { Tooltip } from '@/components/common/Tooltip';
import styles from './ElementCell.module.css';

interface ElementCellProps {
  element: Element;
  isNoFocus?: boolean;
  isFocus?: boolean;
  isActiveGroup?: boolean;
  isFocusGroup?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const categoryClassMap: Record<ElementCategory, string> = {
  'other-nonmetals': styles.otherNonmetals,
  'noble-gases': styles.nobleGases,
  halogens: styles.halogens,
  metalloids: styles.metalloids,
  'alkaline-earth-metals': styles.alkalineEarthMetals,
  'alkali-metals': styles.alkaliMetals,
  'transition-metals': styles.transitionMetals,
  'post-transition-metals': styles.postTransitionMetals,
  lanthanoids: styles.lanthanoids,
  actinoids: styles.actinoids,
};

const threatClassMap: Record<NonNullable<ThreatLevel>, string> = {
  limited: styles.threatLimited,
  rising: styles.threatRising,
  serious: styles.threatSerious,
};

const threatLabels: Record<NonNullable<ThreatLevel>, string> = {
  limited: 'Limited Availability',
  rising: 'Rising Threat',
  serious: 'Serious Threat',
};

function getThreatDots(threatLevel: NonNullable<ThreatLevel>): number {
  switch (threatLevel) {
    case 'limited':
      return 1;
    case 'rising':
      return 2;
    case 'serious':
      return 3;
  }
}

export function ElementCell({
  element,
  isNoFocus = false,
  isFocus = false,
  isActiveGroup = false,
  isFocusGroup = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ElementCellProps) {
  const {
    symbol,
    name,
    atomicNumber,
    atomicMass,
    isSynthetic,
    category,
    threatLevel,
    electronShells,
  } = element;

  const standardState = getStandardState(symbol);
  const radioactive = isRadioactive(symbol);
  const StateIcon = stateIconMap[standardState];
  const stateLabel =
    standardState.charAt(0).toUpperCase() + standardState.slice(1);

  const classNames = [
    styles.cell,
    categoryClassMap[category],
    isNoFocus && styles.noFocus,
    isFocus && styles.focus,
    isActiveGroup && styles.activeGroup,
    isFocusGroup && styles.focusGroup,
    threatLevel && threatClassMap[threatLevel],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid={`element-${atomicNumber}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Tooltip content="Electron shells" position="top">
        <div className={styles.shells} aria-label="Electron shells">
          {electronShells.K !== null && <span>{electronShells.K}</span>}
          {electronShells.L !== null && <span>{electronShells.L}</span>}
          {electronShells.M !== null && <span>{electronShells.M}</span>}
          {electronShells.N !== null && <span>{electronShells.N}</span>}
          {electronShells.O !== null && <span>{electronShells.O}</span>}
          {electronShells.P !== null && <span>{electronShells.P}</span>}
          {electronShells.Q !== null && <span>{electronShells.Q}</span>}
        </div>
      </Tooltip>
      <div className={styles.atomicNumberRow}>
        <Tooltip content="Atomic number" position="top">
          <span className={styles.atomicNumber} aria-label="Atomic number">
            {atomicNumber}
          </span>
        </Tooltip>
        <div className={styles.indicators}>
          <Tooltip content={stateLabel} position="top">
            <span>
              <StateIcon size={10} />
            </span>
          </Tooltip>
          {radioactive && (
            <Tooltip content="Radioactive" position="top">
              <span>
                <RadioactiveIcon size={10} />
              </span>
            </Tooltip>
          )}
        </div>
      </div>
      <div className={styles.symbol}>{symbol}</div>
      <div className={styles.name}>{name}</div>
      <Tooltip content="Atomic mass" position="bottom">
        <div className={styles.mass} aria-label="Atomic mass">
          {isSynthetic ? `[${atomicMass}]` : atomicMass}
        </div>
      </Tooltip>
      {threatLevel && (
        <Tooltip content={threatLabels[threatLevel]} position="left">
          <div
            className={styles.threatIndicator}
            aria-label={threatLabels[threatLevel]}
          >
            {Array.from({ length: getThreatDots(threatLevel) }).map((_, i) => (
              <div key={i} className={styles.threatDot} />
            ))}
          </div>
        </Tooltip>
      )}
    </div>
  );
}
