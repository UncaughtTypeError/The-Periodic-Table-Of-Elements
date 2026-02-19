import type { LegendFilter } from '@/types';
import { SolidIcon, LiquidIcon, GasIcon, RadioactiveIcon } from '@/components/common/icons';
import styles from './Legend.module.css';

interface LegendProps {
  activeLegendFilters: Set<LegendFilter>;
  onLegendClick: (filter: LegendFilter) => void;
  onLegendHover: (filter: LegendFilter | null) => void;
}

const items: { id: LegendFilter; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'solid', label: 'Solid', Icon: SolidIcon },
  { id: 'liquid', label: 'Liquid', Icon: LiquidIcon },
  { id: 'gas', label: 'Gas', Icon: GasIcon },
];

export function Legend({
  activeLegendFilters,
  onLegendClick,
  onLegendHover,
}: LegendProps) {
  return (
    <div className={styles.legend}>
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`${styles.item} ${activeLegendFilters.has(id) ? styles.active : ''}`}
          onClick={() => onLegendClick(id)}
          onMouseEnter={() => onLegendHover(id)}
          onMouseLeave={() => onLegendHover(null)}
        >
          <Icon size={14} />
          <span>{label}</span>
        </button>
      ))}
      <div className={styles.divider} />
      <button
        className={`${styles.item} ${activeLegendFilters.has('radioactive') ? styles.active : ''}`}
        onClick={() => onLegendClick('radioactive')}
        onMouseEnter={() => onLegendHover('radioactive')}
        onMouseLeave={() => onLegendHover(null)}
      >
        <RadioactiveIcon size={14} />
        <span>Radioactive</span>
      </button>
    </div>
  );
}
