import styles from './ElementCell.module.css';

export function EmptyCell() {
  return <div className={`${styles.cell} ${styles.empty}`} />;
}
