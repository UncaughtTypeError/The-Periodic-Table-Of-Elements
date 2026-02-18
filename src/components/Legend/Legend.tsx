import styles from './Legend.module.css';

const SolidIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Solid">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const LiquidIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Liquid">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const GasIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Gas">
    <path d="M17.7 7.7a7.5 7.5 0 1 0-10.6 10.6" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l3 3" />
    <path d="M18 18l3 3" />
  </svg>
);

const RadioactiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-radioactive)" stroke="var(--color-radioactive)" role="img" aria-label="Radioactive">
    <circle cx="12" cy="12" r="11" fill="none" strokeWidth="1.5" />
    <path d="M10.25 8.97 A3.5 3.5 0 0 1 13.75 8.97 L16.5 4.21 A9 9 0 0 0 7.5 4.21 Z" stroke="none" />
    <path d="M15.5 12 A3.5 3.5 0 0 1 13.75 15.03 L16.5 19.79 A9 9 0 0 0 21 12 Z" stroke="none" />
    <path d="M10.25 15.03 A3.5 3.5 0 0 1 8.5 12 L3 12 A9 9 0 0 0 7.5 19.79 Z" stroke="none" />
    <circle cx="12" cy="12" r="2" stroke="none" />
  </svg>
);

export function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.item}>
        <SolidIcon />
        <span>Solid</span>
      </div>
      <div className={styles.item}>
        <LiquidIcon />
        <span>Liquid</span>
      </div>
      <div className={styles.item}>
        <GasIcon />
        <span>Gas</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <RadioactiveIcon />
        <span>Radioactive</span>
      </div>
    </div>
  );
}
