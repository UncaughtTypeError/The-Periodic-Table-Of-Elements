import styles from './ActiveFilterCount.module.css';

interface ActiveFilterCountProps {
  count: number;
}

export function ActiveFilterCount({ count }: ActiveFilterCountProps) {
  return (
    <div className={styles.container}>
      <span className={styles.count}>{count}</span>
      <span className={styles.label}>of 118 elements</span>
    </div>
  );
}
