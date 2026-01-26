import { useMemo } from 'react';
import type { Element, ElementCategory, ThreatLevel } from '../../types';
import { elements as allElements } from '../../data/elements';
import { TABLE_POSITIONS, getLanthanides, getActinides } from '../../data/tableLayout';
import { ElementCell, EmptyCell } from '../Element';
import styles from './PeriodicTable.module.css';

interface PeriodicTableProps {
  activeCategory: ElementCategory | null;
  hoveredCategory: ElementCategory | null;
  activeThreatLevel: ThreatLevel;
  hoveredThreatLevel: ThreatLevel;
  selectedElement: Element | null;
  isDetailOpen: boolean;
  onElementClick: (element: Element) => void;
}

export function PeriodicTable({
  activeCategory,
  hoveredCategory,
  activeThreatLevel,
  hoveredThreatLevel,
  selectedElement,
  isDetailOpen,
  onElementClick,
}: PeriodicTableProps) {
  // Build element lookup map
  const elementMap = useMemo(() => {
    const map = new Map<number, Element>();
    allElements.forEach(el => map.set(el.atomicNumber, el));
    return map;
  }, []);

  // Calculate which elements should be highlighted/dimmed
  const { highlightedSet, noFocusSet } = useMemo(() => {
    const activeFilter = activeCategory || hoveredCategory;
    const activeThreat = activeThreatLevel || hoveredThreatLevel;

    if (!activeFilter && !activeThreat) {
      return { highlightedSet: new Set<number>(), noFocusSet: new Set<number>() };
    }

    const highlighted = new Set<number>();
    const noFocus = new Set<number>();

    allElements.forEach(el => {
      const matchesCategory = activeFilter ? el.category === activeFilter : true;
      const matchesThreat = activeThreat ? el.threatLevel === activeThreat : true;
      const matches = (activeFilter ? matchesCategory : true) && (activeThreat ? matchesThreat : true);

      if (activeFilter || activeThreat) {
        if (matches) {
          highlighted.add(el.atomicNumber);
        } else {
          noFocus.add(el.atomicNumber);
        }
      }
    });

    return { highlightedSet: highlighted, noFocusSet: noFocus };
  }, [activeCategory, hoveredCategory, activeThreatLevel, hoveredThreatLevel]);

  // Build period rows
  const periods = useMemo(() => {
    const rows: (Element | null)[][] = [];

    for (let period = 1; period <= 7; period++) {
      const row: (Element | null)[] = new Array(18).fill(null);

      allElements.forEach(el => {
        const pos = TABLE_POSITIONS[el.atomicNumber];
        if (pos && pos.period === period && !pos.isLanthanide && !pos.isActinide) {
          row[pos.group - 1] = el;
        }
      });

      rows.push(row);
    }

    return rows;
  }, []);

  // Get lanthanides and actinides
  const lanthanides = useMemo(() =>
    getLanthanides(allElements).map(n => elementMap.get(n)!),
  [elementMap]);

  const actinides = useMemo(() =>
    getActinides(allElements).map(n => elementMap.get(n)!),
  [elementMap]);

  const renderCell = (element: Element | null, index: number) => {
    if (!element) {
      return <EmptyCell key={`empty-${index}`} />;
    }

    return (
      <ElementCell
        key={element.atomicNumber}
        element={element}
        isNoFocus={noFocusSet.has(element.atomicNumber)}
        isActiveGroup={highlightedSet.has(element.atomicNumber) && !!activeCategory}
        isFocusGroup={isDetailOpen && selectedElement?.atomicNumber === element.atomicNumber}
        onClick={() => onElementClick(element)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {periods.map((row, periodIndex) => (
          <div key={`period-${periodIndex + 1}`} className={styles.period}>
            {row.map((element, groupIndex) => renderCell(element, groupIndex))}
          </div>
        ))}

        <div className={styles.separator} />

        {/* Lanthanides */}
        <div className={styles.fBlockRow}>
          {lanthanides.map(element => renderCell(element, element.atomicNumber))}
        </div>

        {/* Actinides */}
        <div className={styles.fBlockRow}>
          {actinides.map(element => renderCell(element, element.atomicNumber))}
        </div>
      </div>
    </div>
  );
}
