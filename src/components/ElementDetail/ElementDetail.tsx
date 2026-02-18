import { useEffect } from 'react';
import type { Element, ElementCategory, ThreatLevel, StandardState } from '@/types';
import { getStandardState, isRadioactive } from '@/data';
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

// State of matter icons
const SolidIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Solid">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const LiquidIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Liquid">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const GasIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Gas">
    <path d="M17.7 7.7a7.5 7.5 0 1 0-10.6 10.6" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l3 3" />
    <path d="M18 18l3 3" />
  </svg>
);

const RadioactiveDetailIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--color-radioactive)" stroke="var(--color-radioactive)" role="img" aria-label="Radioactive">
    <circle cx="12" cy="12" r="11" fill="none" strokeWidth="1.5" />
    <path d="M10.25 8.97 A3.5 3.5 0 0 1 13.75 8.97 L16.5 4.21 A9 9 0 0 0 7.5 4.21 Z" stroke="none" />
    <path d="M15.5 12 A3.5 3.5 0 0 1 13.75 15.03 L16.5 19.79 A9 9 0 0 0 21 12 Z" stroke="none" />
    <path d="M10.25 15.03 A3.5 3.5 0 0 1 8.5 12 L3 12 A9 9 0 0 0 7.5 19.79 Z" stroke="none" />
    <circle cx="12" cy="12" r="2" stroke="none" />
  </svg>
);

const stateIconMap: Record<StandardState, React.FC<{ size?: number }>> = {
  solid: SolidIcon,
  liquid: LiquidIcon,
  gas: GasIcon,
};

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
              <div className={styles.atomicNumberRow}>
                <span className={modalStyles.atomicNumber}>{atomicNumber}</span>
                <div className={styles.modalIndicators}>
                  {(() => { const Icon = stateIconMap[getStandardState(symbol)]; return <Icon size={20} />; })()}
                  {isRadioactive(symbol) && <RadioactiveDetailIcon size={20} />}
                </div>
              </div>
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
              <li className={styles.standardStateItem}>
                <strong>Standard state:</strong>{' '}
                {getStandardState(symbol).charAt(0).toUpperCase() +
                  getStandardState(symbol).slice(1)}
                {(() => { const Icon = stateIconMap[getStandardState(symbol)]; return <Icon size={14} />; })()}
              </li>
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

            {isRadioactive(symbol) && (
              <div className={styles.radioactiveBadge}>
                <div className={styles.radioactiveIcon}>
                  <RadioactiveDetailIcon size={20} />
                </div>
                <span>Radioactive - All isotopes unstable</span>
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
