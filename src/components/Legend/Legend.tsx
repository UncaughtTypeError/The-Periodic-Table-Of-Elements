import { SolidIcon, LiquidIcon, GasIcon, RadioactiveIcon } from '@/components/common/icons';
import styles from './Legend.module.css';

export function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.item}>
        <SolidIcon size={14} />
        <span>Solid</span>
      </div>
      <div className={styles.item}>
        <LiquidIcon size={14} />
        <span>Liquid</span>
      </div>
      <div className={styles.item}>
        <GasIcon size={14} />
        <span>Gas</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <RadioactiveIcon size={14} />
        <span>Radioactive</span>
      </div>
    </div>
  );
}
