import type { Element, ElementCategory, ThreatLevel, StandardState } from '@/types';
import { getStandardState, isRadioactive } from '@/data';
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

const SolidIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Solid">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const LiquidIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Liquid">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const GasIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Gas">
    <path d="M17.7 7.7a7.5 7.5 0 1 0-10.6 10.6" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l3 3" />
    <path d="M18 18l3 3" />
  </svg>
);

const RadioactiveIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-radioactive)" stroke="var(--color-radioactive)" role="img" aria-label="Radioactive">
    <circle cx="12" cy="12" r="11" fill="none" strokeWidth="1.5" />
    <path d="M10.25 8.97 A3.5 3.5 0 0 1 13.75 8.97 L16.5 4.21 A9 9 0 0 0 7.5 4.21 Z" stroke="none" />
    <path d="M15.5 12 A3.5 3.5 0 0 1 13.75 15.03 L16.5 19.79 A9 9 0 0 0 21 12 Z" stroke="none" />
    <path d="M10.25 15.03 A3.5 3.5 0 0 1 8.5 12 L3 12 A9 9 0 0 0 7.5 19.79 Z" stroke="none" />
    <circle cx="12" cy="12" r="2" stroke="none" />
  </svg>
);

const stateIconMap: Record<StandardState, React.FC> = {
  solid: SolidIcon,
  liquid: LiquidIcon,
  gas: GasIcon,
};

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

  const standardState = getStandardState(symbol);
  const radioactive = isRadioactive(symbol);
  const StateIcon = stateIconMap[standardState];

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
      <div className={styles.atomicNumberRow}>
        <span className={styles.atomicNumber}>{atomicNumber}</span>
        <div className={styles.indicators}>
          <StateIcon />
          {radioactive && <RadioactiveIcon />}
        </div>
      </div>
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
