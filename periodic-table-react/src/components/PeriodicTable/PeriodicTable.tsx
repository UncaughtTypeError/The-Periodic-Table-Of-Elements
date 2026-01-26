import { useMemo } from 'react';
import type { Element, ElementCategory, ThreatLevel } from '../../types';
import { elements as allElements } from '../../data/elements';
import { TABLE_POSITIONS, getLanthanides, getActinides } from '../../data/tableLayout';
import { ElementCell, EmptyCell } from '../Element';
import styles from './PeriodicTable.module.css';

interface PeriodicTableProps {
  activeCategories: Set<ElementCategory>;
  hoveredCategory: ElementCategory | null;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  hoveredThreatLevel: ThreatLevel;
  hoveredElementNumber: number | null;
  selectedElement: Element | null;
  isDetailOpen: boolean;
  onElementClick: (element: Element) => void;
  onElementHover: (atomicNumber: number | null) => void;
}

export function PeriodicTable({
  activeCategories,
  hoveredCategory,
  activeThreatLevels,
  hoveredThreatLevel,
  hoveredElementNumber,
  selectedElement,
  isDetailOpen,
  onElementClick,
  onElementHover,
}: PeriodicTableProps) {
  // Build element lookup map
  const elementMap = useMemo(() => {
    const map = new Map<number, Element>();
    allElements.forEach(el => map.set(el.atomicNumber, el));
    return map;
  }, []);

  // Calculate which elements should be highlighted/dimmed/activeGroup
  const { activeGroupSet, noFocusSet } = useMemo(() => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;

    // No filters active - everything normal
    if (!hasActiveCategories && !hasActiveThreats && !hasHoveredCategory && !hasHoveredThreat) {
      return { activeGroupSet: new Set<number>(), noFocusSet: new Set<number>() };
    }

    const activeGroup = new Set<number>();
    const noFocus = new Set<number>();

    allElements.forEach(el => {
      // Check if element matches active category filters
      const matchesActiveCategory = hasActiveCategories ? activeCategories.has(el.category) : true;

      // Check if element matches active threat filters
      const matchesActiveThreat = hasActiveThreats
        ? (el.threatLevel !== null && activeThreatLevels.has(el.threatLevel))
        : true;

      // Check if element matches hovered category (when other categories are active)
      const matchesHoveredCategory = hasHoveredCategory && el.category === hoveredCategory;

      // Check if element matches hovered threat
      const matchesHoveredThreat = hasHoveredThreat
        ? (el.threatLevel !== null && el.threatLevel === hoveredThreatLevel)
        : false;

      // Determine if element should be in activeGroup (highlighted with background)
      // This happens when element matches ALL active filters (both category AND threat if both are set)
      if (hasActiveCategories || hasActiveThreats) {
        const matchesBothActiveFilters = matchesActiveCategory && matchesActiveThreat;
        if (matchesBothActiveFilters) {
          activeGroup.add(el.atomicNumber);
        }
      }

      // Determine if element should be noFocus (dimmed)
      // Priority rules:
      // 1. If hovering a category while others are active, don't dim the hovered category's elements
      // 2. If hovering a threat while others are active, don't dim the hovered threat's elements
      // 3. Threat filters take priority - they can dim elements even if they match a category filter

      let shouldBeDimmed = false;

      if (hasActiveCategories || hasActiveThreats) {
        // Start by checking if element matches all active filters
        const matchesBothActiveFilters = matchesActiveCategory && matchesActiveThreat;

        if (!matchesBothActiveFilters) {
          // Element doesn't match all active filters, so it should be dimmed...
          // UNLESS it matches the currently hovered filter
          if (hasHoveredCategory && matchesHoveredCategory) {
            // Don't dim - hovering shows this category even when other filters are active
            shouldBeDimmed = false;
          } else if (hasHoveredThreat && matchesHoveredThreat) {
            // Don't dim - hovering shows this threat even when other filters are active
            // But only if it also matches active category filters (threat can't activate non-matching categories)
            if (!hasActiveCategories || matchesActiveCategory) {
              shouldBeDimmed = false;
            } else {
              shouldBeDimmed = true;
            }
          } else {
            shouldBeDimmed = true;
          }
        }
      } else if (hasHoveredCategory || hasHoveredThreat) {
        // Only hover active, no click filters
        const matchesHover = hasHoveredCategory
          ? matchesHoveredCategory
          : matchesHoveredThreat;

        if (!matchesHover) {
          shouldBeDimmed = true;
        }
      }

      if (shouldBeDimmed) {
        noFocus.add(el.atomicNumber);
      }
    });

    return { activeGroupSet: activeGroup, noFocusSet: noFocus };
  }, [activeCategories, hoveredCategory, activeThreatLevels, hoveredThreatLevel]);

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

    // Element is not dimmed if it's being hovered directly
    const isHovered = hoveredElementNumber === element.atomicNumber;
    const shouldBeNoFocus = noFocusSet.has(element.atomicNumber) && !isHovered;

    return (
      <ElementCell
        key={element.atomicNumber}
        element={element}
        isNoFocus={shouldBeNoFocus}
        isActiveGroup={activeGroupSet.has(element.atomicNumber)}
        isFocusGroup={isDetailOpen && selectedElement?.atomicNumber === element.atomicNumber}
        onClick={() => onElementClick(element)}
        onMouseEnter={() => onElementHover(element.atomicNumber)}
        onMouseLeave={() => onElementHover(null)}
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
