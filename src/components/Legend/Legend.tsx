import type { LegendFilter } from '@/types';
import {
  PrimordialIcon,
  FromDecayIcon,
  SyntheticIcon,
  SolidIcon,
  LiquidIcon,
  GasIcon,
  RadioactiveIcon,
} from '@/components/common/icons';
import styles from './Legend.module.css';

interface LegendProps {
  activeLegendFilters: Set<LegendFilter>;
  legendCounts: Map<LegendFilter, number>;
  onLegendClick: (filter: LegendFilter) => void;
  onLegendHover: (filter: LegendFilter | null) => void;
}

interface LegendItem {
  id: LegendFilter;
  label: string;
  Icon: React.FC<{ size?: number }>;
}

const occurrenceItems: LegendItem[] = [
  { id: 'primordial', label: 'Primordial', Icon: PrimordialIcon },
  { id: 'from-decay', label: 'From Decay', Icon: FromDecayIcon },
  { id: 'synthetic', label: 'Synthetic', Icon: SyntheticIcon },
];

const stateItems: LegendItem[] = [
  { id: 'solid', label: 'Solid', Icon: SolidIcon },
  { id: 'liquid', label: 'Liquid', Icon: LiquidIcon },
  { id: 'gas', label: 'Gas', Icon: GasIcon },
];

function LegendButton({
  item,
  isActive,
  count,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  item: LegendItem;
  isActive: boolean;
  count: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <item.Icon size={14} />
      <span>
        {item.label} <span className={styles.count}>({count})</span>
      </span>
    </button>
  );
}

export function Legend({
  activeLegendFilters,
  legendCounts,
  onLegendClick,
  onLegendHover,
}: LegendProps) {
  const renderItems = (items: LegendItem[]) =>
    items.map((item) => (
      <LegendButton
        key={item.id}
        item={item}
        isActive={activeLegendFilters.has(item.id)}
        count={legendCounts.get(item.id) ?? 0}
        onClick={() => onLegendClick(item.id)}
        onMouseEnter={() => onLegendHover(item.id)}
        onMouseLeave={() => onLegendHover(null)}
      />
    ));

  return (
    <div className={styles.legend}>
      {renderItems(occurrenceItems)}
      <div className={styles.divider} />
      {renderItems(stateItems)}
      <div className={styles.divider} />
      <button
        className={`${styles.item} ${activeLegendFilters.has('radioactive') ? styles.active : ''}`}
        onClick={() => onLegendClick('radioactive')}
        onMouseEnter={() => onLegendHover('radioactive')}
        onMouseLeave={() => onLegendHover(null)}
      >
        <RadioactiveIcon size={14} />
        <span>
          Radioactive{' '}
          <span className={styles.count}>
            ({legendCounts.get('radioactive') ?? 0})
          </span>
        </span>
      </button>
    </div>
  );
}
