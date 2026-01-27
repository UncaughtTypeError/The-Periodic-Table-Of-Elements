import { useEffect } from 'react';
import type { Element, ElementCategory, ThreatLevel } from '@/types';
import styles from './ElementDetail.module.css';

interface ElementDetailProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
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

const threatClassMap: Record<NonNullable<ThreatLevel>, string> = {
  limited: styles.threatLimited,
  rising: styles.threatRising,
  serious: styles.threatSerious,
};

const threatLabels: Record<NonNullable<ThreatLevel>, { name: string; description: string }> = {
  limited: { name: 'Limited Availability', description: 'Future risk to supply' },
  rising: { name: 'Rising Threat', description: 'From increased use' },
  serious: { name: 'Serious Threat', description: 'In the next 100 years' },
};

function getThreatDots(threatLevel: NonNullable<ThreatLevel>): number {
  switch (threatLevel) {
    case 'limited': return 1;
    case 'rising': return 2;
    case 'serious': return 3;
  }
}

export function ElementDetail({ element, isOpen, onClose }: ElementDetailProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!element) {
    return null;
  }

  const { symbol, name, atomicNumber, atomicMass, isSynthetic, category, threatLevel, electronShells, summary, detail } = element;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={handleBackdropClick}
      data-testid="detail-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="element-detail-title"
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.modalContent}>
          {/* Summary Card */}
          <div className={styles.card}>
            <div className={`${styles.element} ${categoryClassMap[category]}`}>
              <div className={styles.atomicOrbitalShells}>
                {electronShells.K !== null && <span>{electronShells.K}</span>}
                {electronShells.L !== null && <span>{electronShells.L}</span>}
                {electronShells.M !== null && <span>{electronShells.M}</span>}
                {electronShells.N !== null && <span>{electronShells.N}</span>}
                {electronShells.O !== null && <span>{electronShells.O}</span>}
                {electronShells.P !== null && <span>{electronShells.P}</span>}
                {electronShells.Q !== null && <span>{electronShells.Q}</span>}
              </div>
              <div className={styles.atomicNumber}>{atomicNumber}</div>
              <div className={styles.elementSymbol} id="element-detail-title">{symbol}</div>
              <div className={styles.elementName}>{name}</div>
              <div className={styles.atomicMass}>{isSynthetic ? `[${atomicMass}]` : atomicMass}</div>
            </div>

            <ul className={styles.propertyList}>
              <li><strong>Symbol:</strong> <sub>{atomicNumber}</sub>{symbol}</li>
              <li><strong>Name:</strong> {name.toLowerCase()}</li>
              <li><strong>Atomic number:</strong> {atomicNumber}</li>
              {summary.atomicMass && <li><strong>Atomic mass:</strong> {summary.atomicMass}</li>}
              {summary.boilingPoint && <li><strong>Boiling point:</strong> {summary.boilingPoint}</li>}
              {summary.electronConfiguration && <li><strong>Electron configuration:</strong> {summary.electronConfiguration}</li>}
              {summary.electronegativity && <li><strong>Electronegativity:</strong> {summary.electronegativity}</li>}
              {summary.discovered && <li><strong>Discovered:</strong> {summary.discovered}</li>}
              {summary.discoverer && <li><strong>Discoverer:</strong> {summary.discoverer}</li>}
            </ul>

            {threatLevel && (
              <div className={`${styles.endangeredBadge} ${threatClassMap[threatLevel]}`}>
                <div className={styles.threatIcon}>
                  <span>&#9888;</span>
                  <div className={styles.threatDots}>
                    {Array.from({ length: getThreatDots(threatLevel) }).map((_, i) => (
                      <div key={i} className={styles.threatDot} />
                    ))}
                  </div>
                </div>
                <span>{threatLabels[threatLevel].name} - {threatLabels[threatLevel].description}</span>
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className={`${styles.card} ${styles.description}`}>
            {detail.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Overview Card */}
          <div className={`${styles.card} ${styles.overview}`}>
            {(detail.general.appearance || detail.general.group || detail.general.block) && (
              <>
                <h4>General properties</h4>
                <ul>
                  {detail.general.appearance && <li><strong>Appearance:</strong> {detail.general.appearance}</li>}
                  {detail.general.group && <li><strong>Group:</strong> {detail.general.group}</li>}
                  {detail.general.block && <li><strong>Block:</strong> {detail.general.block}</li>}
                  {detail.general.period && <li><strong>Period:</strong> {detail.general.period}</li>}
                  {detail.general.elementCategory && <li><strong>Element category:</strong> {detail.general.elementCategory}</li>}
                  {detail.general.electronConfiguration && <li><strong>Electron configuration:</strong> {detail.general.electronConfiguration}</li>}
                  {detail.general.perShell && <li><strong>Per shell:</strong> {detail.general.perShell}</li>}
                </ul>
              </>
            )}

            {(detail.physical.phase || detail.physical.meltingPoint || detail.physical.boilingPoint) && (
              <>
                <h4>Physical properties</h4>
                <ul>
                  {detail.physical.color && <li><strong>Color:</strong> {detail.physical.color}</li>}
                  {detail.physical.phase && <li><strong>Phase:</strong> {detail.physical.phase}</li>}
                  {detail.physical.meltingPoint && <li><strong>Melting point:</strong> {detail.physical.meltingPoint}</li>}
                  {detail.physical.boilingPoint && <li><strong>Boiling point:</strong> {detail.physical.boilingPoint}</li>}
                  {detail.physical.density && <li><strong>Density:</strong> {detail.physical.density}</li>}
                </ul>
              </>
            )}

            {(detail.history.discovery || detail.history.namedBy) && (
              <>
                <h4>History</h4>
                <ul>
                  {detail.history.discovery && <li><strong>Discovery:</strong> {detail.history.discovery}</li>}
                  {detail.history.namedBy && <li><strong>Named by:</strong> {detail.history.namedBy}</li>}
                  {detail.history.naming && <li><strong>Naming:</strong> {detail.history.naming}</li>}
                  {detail.history.firstIsolation && <li><strong>First isolation:</strong> {detail.history.firstIsolation}</li>}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
