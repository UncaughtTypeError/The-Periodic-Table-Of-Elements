import { useEffect } from 'react';
import type { Element, ElementCategory, ThreatLevel } from '@/types';
import modalStyles from './Modal.module.css';
import styles from './ElementDetail.module.css';

interface ElementDetailProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryClassMap: Record<ElementCategory, string> = {
  'other-nonmetals': modalStyles.otherNonmetals,
  'noble-gases': modalStyles.nobleGases,
  halogens: modalStyles.halogens,
  metalloids: modalStyles.metalloids,
  'alkaline-earth-metals': modalStyles.alkalineEarthMetals,
  'alkali-metals': modalStyles.alkaliMetals,
  'transition-metals': modalStyles.transitionMetals,
  'post-transition-metals': modalStyles.postTransitionMetals,
  lanthanoids: modalStyles.lanthanoids,
  actinoids: modalStyles.actinoids,
};

const threatClassMap: Record<NonNullable<ThreatLevel>, string> = {
  limited: styles.threatLimited,
  rising: styles.threatRising,
  serious: styles.threatSerious,
};

const threatLabels: Record<
  NonNullable<ThreatLevel>,
  { name: string; description: string }
> = {
  limited: {
    name: 'Limited Availability',
    description: 'Future risk to supply',
  },
  rising: { name: 'Rising Threat', description: 'From increased use' },
  serious: { name: 'Serious Threat', description: 'In the next 100 years' },
};

function getThreatDots(threatLevel: NonNullable<ThreatLevel>): number {
  switch (threatLevel) {
    case 'limited':
      return 1;
    case 'rising':
      return 2;
    case 'serious':
      return 3;
  }
}

// SVG Icons for section headings
const BeakerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 3h15" />
    <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
    <path d="M6 14h12" />
  </svg>
);

const ThermometerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

const HistoryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

export function ElementDetail({
  element,
  isOpen,
  onClose,
}: ElementDetailProps) {
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

  const {
    symbol,
    name,
    atomicNumber,
    atomicMass,
    isSynthetic,
    category,
    threatLevel,
    electronShells,
    summary,
    detail,
  } = element;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${modalStyles.overlay} ${isOpen ? modalStyles.open : ''}`}
      onClick={handleBackdropClick}
      data-testid="detail-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="element-detail-title"
    >
      <div className={modalStyles.modal}>
        <button
          className={modalStyles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className={modalStyles.modalContent}>
          {/* Summary Card */}
          <div className={`${modalStyles.card} ${modalStyles.summary}`}>
            <div
              className={`${modalStyles.element} ${categoryClassMap[category]}`}
            >
              <div className={styles.atomicOrbitalShells}>
                {electronShells.K !== null && <span>{electronShells.K}</span>}
                {electronShells.L !== null && <span>{electronShells.L}</span>}
                {electronShells.M !== null && <span>{electronShells.M}</span>}
                {electronShells.N !== null && <span>{electronShells.N}</span>}
                {electronShells.O !== null && <span>{electronShells.O}</span>}
                {electronShells.P !== null && <span>{electronShells.P}</span>}
                {electronShells.Q !== null && <span>{electronShells.Q}</span>}
              </div>
              <div className={modalStyles.atomicNumber}>{atomicNumber}</div>
              <div
                className={modalStyles.elementSymbol}
                id="element-detail-title"
              >
                {symbol}
              </div>
              <div className={modalStyles.elementName}>{name}</div>
              <div className={styles.atomicMass}>
                {isSynthetic ? `[${atomicMass}]` : atomicMass}
              </div>
            </div>

            <ul className={styles.propertyList}>
              <li>
                <strong>Symbol:</strong> <sub>{atomicNumber}</sub>
                {symbol}
              </li>
              <li>
                <strong>Name:</strong> {name.toLowerCase()}
              </li>
              <li>
                <strong>Atomic number:</strong> {atomicNumber}
              </li>
              {summary.atomicMass && (
                <li>
                  <strong>Atomic mass:</strong> {summary.atomicMass}
                </li>
              )}
              {summary.boilingPoint && (
                <li>
                  <strong>Boiling point:</strong> {summary.boilingPoint}
                </li>
              )}
              {summary.electronConfiguration && (
                <li>
                  <strong>Electron configuration:</strong>{' '}
                  {summary.electronConfiguration}
                </li>
              )}
              {summary.electronegativity && (
                <li>
                  <strong>Electronegativity:</strong>{' '}
                  {summary.electronegativity}
                </li>
              )}
            </ul>

            {threatLevel && (
              <div
                className={`${styles.endangeredBadge} ${threatClassMap[threatLevel]}`}
              >
                <div className={styles.threatIcon}>
                  <span>&#9888;</span>
                  <div className={styles.threatDots}>
                    {Array.from({ length: getThreatDots(threatLevel) }).map(
                      (_, i) => (
                        <div key={i} className={styles.threatDot} />
                      ),
                    )}
                  </div>
                </div>
                <span>
                  {threatLabels[threatLevel].name} -{' '}
                  {threatLabels[threatLevel].description}
                </span>
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className={`${modalStyles.card} ${modalStyles.description}`}>
            {detail.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Overview Card */}
          <div className={`${modalStyles.card} ${styles.overview}`}>
            {(detail.general.appearance ||
              detail.general.group ||
              detail.general.block) && (
              <>
                <h4>
                  <BeakerIcon /> General properties
                </h4>
                <ul>
                  {detail.general.appearance && (
                    <li>
                      <strong>Appearance:</strong> {detail.general.appearance}
                    </li>
                  )}
                  {detail.general.group && (
                    <li>
                      <strong>Group:</strong> {detail.general.group}
                    </li>
                  )}
                  {detail.general.block && (
                    <li>
                      <strong>Block:</strong> {detail.general.block}
                    </li>
                  )}
                  {detail.general.period && (
                    <li>
                      <strong>Period:</strong> {detail.general.period}
                    </li>
                  )}
                  {detail.general.elementCategory && (
                    <li>
                      <strong>Element category:</strong>{' '}
                      {detail.general.elementCategory}
                    </li>
                  )}
                  {detail.general.electronConfiguration && (
                    <li>
                      <strong>Electron configuration:</strong>{' '}
                      {detail.general.electronConfiguration}
                    </li>
                  )}
                  {detail.general.perShell && (
                    <li>
                      <strong>Per shell:</strong> {detail.general.perShell}
                    </li>
                  )}
                </ul>
              </>
            )}

            {(detail.physical.phase ||
              detail.physical.meltingPoint ||
              detail.physical.boilingPoint) && (
              <>
                <h4>
                  <ThermometerIcon /> Physical properties
                </h4>
                <ul>
                  {detail.physical.color && (
                    <li>
                      <strong>Color:</strong> {detail.physical.color}
                    </li>
                  )}
                  {detail.physical.phase && (
                    <li>
                      <strong>Phase:</strong> {detail.physical.phase}
                    </li>
                  )}
                  {detail.physical.meltingPoint && (
                    <li>
                      <strong>Melting point:</strong>{' '}
                      {detail.physical.meltingPoint}
                    </li>
                  )}
                  {detail.physical.boilingPoint && (
                    <li>
                      <strong>Boiling point:</strong>{' '}
                      {detail.physical.boilingPoint}
                    </li>
                  )}
                  {detail.physical.density && (
                    <li>
                      <strong>Density:</strong> {detail.physical.density}
                    </li>
                  )}
                </ul>
              </>
            )}

            {(detail.history.discovery ||
              detail.history.namedBy ||
              detail.history.naming ||
              detail.history.firstIsolation ||
              summary.discovered ||
              summary.discoverer) && (
              <>
                <h4>
                  <HistoryIcon /> History
                </h4>
                <ul>
                  {(detail.history.discovery || summary.discovered) && (
                    <li>
                      <strong>Discovery:</strong>{' '}
                      {detail.history.discovery || summary.discovered}
                    </li>
                  )}
                  {(detail.history.namedBy || summary.discoverer) && (
                    <li>
                      <strong>
                        {detail.history.namedBy ? 'Named by:' : 'Discoverer:'}
                      </strong>{' '}
                      {detail.history.namedBy || summary.discoverer}
                    </li>
                  )}
                  {detail.history.naming && (
                    <li>
                      <strong>Naming:</strong> {detail.history.naming}
                    </li>
                  )}
                  {detail.history.firstIsolation && (
                    <li>
                      <strong>First isolation:</strong>{' '}
                      {detail.history.firstIsolation}
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
