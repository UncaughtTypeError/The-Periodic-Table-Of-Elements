import { useEffect, useMemo } from 'react';
import type { SeriesPlaceholder, Element, ElementCategory } from '@/types';
import { elements as allElements } from '@/data/elements';
import styles from './SeriesDetail.module.css';

interface SeriesDetailProps {
  series: SeriesPlaceholder | null;
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

export function SeriesDetail({ series, isOpen, onClose }: SeriesDetailProps) {
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

  // Get series elements
  const seriesElements = useMemo(() => {
    if (!series) return [];
    return allElements.filter(el => series.elementNumbers.includes(el.atomicNumber));
  }, [series]);

  // Build mini periodic table structure (simplified 7 periods x 32 groups for full width)
  // Must be called before early return to maintain hook order
  const miniTableData = useMemo(() => {
    if (!series) return [];

    // Standard positions for mini table
    const periods: (Element | 'empty' | 'highlight')[][] = [];

    for (let p = 1; p <= 7; p++) {
      const row: (Element | 'empty' | 'highlight')[] = new Array(32).fill('empty');
      periods.push(row);
    }

    // Fill in standard element positions (simplified)
    allElements.forEach(el => {
      const periodIndex = el.period - 1;
      // Map groups: 1-2 stay, 3-18 go to 17-32
      let groupIndex = el.group - 1;
      if (el.group >= 3) {
        groupIndex = el.group + 14;
      }

      // Handle lanthanides (period 6, positions 3-16)
      if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
        groupIndex = 2 + (el.atomicNumber - 57);
        periods[5][groupIndex] = series.id === 'lanthanoids' ? 'highlight' : el;
      }
      // Handle actinides (period 7, positions 3-16)
      else if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
        groupIndex = 2 + (el.atomicNumber - 89);
        periods[6][groupIndex] = series.id === 'actinoids' ? 'highlight' : el;
      }
      else if (periodIndex >= 0 && periodIndex < 7 && groupIndex >= 0 && groupIndex < 32) {
        periods[periodIndex][groupIndex] = el;
      }
    });

    return periods;
  }, [series]);

  if (!series) {
    return null;
  }

  const { symbol, name, atomicNumberRange, category, description } = series;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={handleBackdropClick}
      data-testid="series-detail-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="series-detail-title"
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.modalContent}>
          {/* Summary Card with Element Display */}
          <div className={styles.card}>
            <div className={`${styles.element} ${categoryClassMap[category]}`}>
              <div className={styles.atomicNumber}>{atomicNumberRange}</div>
              <div className={styles.elementSymbol} id="series-detail-title">{symbol}</div>
              <div className={styles.elementName}>{name}</div>
            </div>
            <p>{description[0]}</p>
          </div>

          {/* Description Cards */}
          <div className={`${styles.card} ${styles.description}`}>
            {description.slice(1, 3).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {description.length > 3 && (
            <div className={`${styles.card} ${styles.description}`}>
              {description.slice(3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Series Elements Row */}
        <div className={styles.seriesSection}>
          <div className={styles.seriesRow}>
            {seriesElements.map(el => (
              <div key={el.atomicNumber} className={`${styles.seriesElement} ${categoryClassMap[category]}`}>
                <div className={styles.seriesAtomicNumber}>{el.atomicNumber}</div>
                <div className={styles.seriesSymbol}>{el.symbol}</div>
                <div className={styles.seriesName}>{el.name}</div>
                <div className={styles.seriesMass}>{el.isSynthetic ? `(${el.atomicMass})` : el.atomicMass}</div>
              </div>
            ))}
          </div>

          {/* Mini Periodic Table Overview */}
          <div className={styles.tableOverview}>
            {miniTableData.map((row, periodIndex) => (
              <div key={periodIndex} className={styles.miniPeriod}>
                {row.map((cell, groupIndex) => {
                  if (cell === 'empty') {
                    return <div key={groupIndex} className={`${styles.miniCell} ${styles.miniEmpty}`} />;
                  }
                  if (cell === 'highlight') {
                    return <div key={groupIndex} className={`${styles.miniCell} ${styles.miniHighlight} ${categoryClassMap[category]}`} />;
                  }
                  return <div key={groupIndex} className={`${styles.miniCell} ${styles.miniFilled}`} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
