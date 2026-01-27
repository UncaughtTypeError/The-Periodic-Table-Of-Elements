import type { Element, ElementCategory, ThreatLevel } from '@/types';
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
  'halogens': styles.halogens,
  'metalloids': styles.metalloids,
  'alkaline-earth-metals': styles.alkalineEarthMetals,
  'alkali-metals': styles.alkaliMetals,
  'transition-metals': styles.transitionMetals,
  'post-transition-metals': styles.postTransitionMetals,
  'lanthanoids': styles.lanthanoids,
  'actinoids': styles.actinoids,
};

const threatClassMap: Record<NonNullable<ThreatLevel>, string> = {
  'limited': styles.threatLimited,
  'rising': styles.threatRising,
  'serious': styles.threatSerious,
};

function getThreatDots(threatLevel: NonNullable<ThreatLevel>): number {
  switch (threatLevel) {
    case 'limited': return 1;
    case 'rising': return 2;
    case 'serious': return 3;
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
  const { symbol, name, atomicNumber, atomicMass, isSynthetic, category, threatLevel, electronShells } = element;

  const classNames = [
    styles.cell,
    categoryClassMap[category],
    isNoFocus && styles.noFocus,
    isFocus && styles.focus,
    isActiveGroup && styles.activeGroup,
    isFocusGroup && styles.focusGroup,
    threatLevel && threatClassMap[threatLevel],
  ].filter(Boolean).join(' ');

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
      <div className={styles.shells}>
        {electronShells.K !== null && <span>{electronShells.K}</span>}
        {electronShells.L !== null && <span>{electronShells.L}</span>}
        {electronShells.M !== null && <span>{electronShells.M}</span>}
        {electronShells.N !== null && <span>{electronShells.N}</span>}
        {electronShells.O !== null && <span>{electronShells.O}</span>}
        {electronShells.P !== null && <span>{electronShells.P}</span>}
        {electronShells.Q !== null && <span>{electronShells.Q}</span>}
      </div>
      <div className={styles.atomicNumber}>{atomicNumber}</div>
      <div className={styles.symbol}>{symbol}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.mass}>{isSynthetic ? `[${atomicMass}]` : atomicMass}</div>
      {threatLevel && (
        <div className={styles.threatIndicator}>
          {Array.from({ length: getThreatDots(threatLevel) }).map((_, i) => (
            <div key={i} className={styles.threatDot} />
          ))}
        </div>
      )}
    </div>
  );
}
