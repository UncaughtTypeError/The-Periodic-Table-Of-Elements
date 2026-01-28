import styles from './ElementCell.module.css';

interface LabelCellProps {
  label: string;
}

export function LabelCell({ label }: LabelCellProps) {
  return (
    <div className={`${styles.cell} ${styles.empty} ${styles.label}`}>
      {label}
    </div>
  );
}
