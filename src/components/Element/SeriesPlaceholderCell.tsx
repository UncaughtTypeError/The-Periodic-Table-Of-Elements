import type { SeriesPlaceholder, ElementCategory } from '@/types';
import styles from './ElementCell.module.css';

interface SeriesPlaceholderCellProps {
  series: SeriesPlaceholder;
  isNoFocus?: boolean;
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

export function SeriesPlaceholderCell({
  series,
  isNoFocus = false,
  isActiveGroup = false,
  isFocusGroup = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: SeriesPlaceholderCellProps) {
  const { symbol, name, atomicNumberRange, category } = series;

  const classNames = [
    styles.cell,
    styles.placeholder,
    categoryClassMap[category],
    isNoFocus && styles.noFocus,
    isActiveGroup && styles.activeGroup,
    isFocusGroup && styles.focusGroup,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid={`series-${series.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className={styles.atomicNumber}>{atomicNumberRange}</div>
      <div className={styles.symbol}>{symbol}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}
