import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        &copy; {currentYear} Periodic Table of Chemical Elements
      </div>
      <div className={styles.contact}>
        <span>@</span>
        <a href="mailto:contact@periodictableofchemicalelements.com">
          contact@periodictableofchemicalelements.com
        </a>
      </div>
    </footer>
  );
}
