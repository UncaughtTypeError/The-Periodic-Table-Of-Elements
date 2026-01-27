import type { ThreatLevel } from '@/types';
import { THREATS } from '@/data/categories';
import styles from './ThreatFilter.module.css';

interface ThreatFilterProps {
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  onThreatClick: (threat: NonNullable<ThreatLevel>) => void;
  onThreatHover: (threat: ThreatLevel) => void;
}

const threatClassMap: Record<NonNullable<ThreatLevel>, string> = {
  limited: styles.threatLimited,
  rising: styles.threatRising,
  serious: styles.threatSerious,
};

export function ThreatFilter({
  activeThreatLevels,
  onThreatClick,
  onThreatHover,
}: ThreatFilterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Endangered Elements</div>
      {THREATS.map(threat => (
        <button
          key={threat.id}
          className={`${styles.button} ${threatClassMap[threat.id]} ${
            activeThreatLevels.has(threat.id) ? styles.active : ''
          }`}
          onClick={() => onThreatClick(threat.id)}
          onMouseEnter={() => onThreatHover(threat.id)}
          onMouseLeave={() => onThreatHover(null)}
        >
          <div className={styles.icon}>
            <span className={styles.warningIcon}>&#9888;</span>
            <div className={styles.dots}>
              {Array.from({ length: threat.iconCount }).map((_, i) => (
                <div key={i} className={styles.dot} />
              ))}
            </div>
          </div>
          <div className={styles.label}>
            <span className={styles.name}>{threat.name}</span>
            <span className={styles.description}>{threat.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
