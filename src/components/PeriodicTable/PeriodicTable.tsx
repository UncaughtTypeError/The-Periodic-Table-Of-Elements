import { useMemo } from 'react';
import type { Element, ElementCategory, ThreatLevel, SeriesPlaceholder, SeriesType } from '../../types';
import { elements as allElements } from '../../data/elements';
import { seriesPlaceholders } from '../../data/series';
import { TABLE_POSITIONS, getLanthanides, getActinides } from '../../data/tableLayout';
import { ElementCell, EmptyCell, SeriesPlaceholderCell } from '../Element';
import styles from './PeriodicTable.module.css';

interface PeriodicTableProps {
  activeCategories: Set<ElementCategory>;
  hoveredCategory: ElementCategory | null;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  hoveredThreatLevel: ThreatLevel;
  hoveredElementNumber: number | null;
  hoveredSeriesId: SeriesType | null;
  selectedElement: Element | null;
  selectedSeries: SeriesPlaceholder | null;
  isDetailOpen: boolean;
  isSeriesDetailOpen: boolean;
  onElementClick: (element: Element) => void;
  onElementHover: (atomicNumber: number | null) => void;
  onSeriesClick: (series: SeriesPlaceholder) => void;
  onSeriesHover: (seriesId: SeriesType | null) => void;
}

export function PeriodicTable({
  activeCategories,
  hoveredCategory,
  activeThreatLevels,
  hoveredThreatLevel,
  hoveredElementNumber,
  hoveredSeriesId,
  selectedElement,
  selectedSeries,
  isDetailOpen,
  isSeriesDetailOpen,
  onElementClick,
  onElementHover,
  onSeriesClick,
  onSeriesHover,
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

  // Get series placeholders
  const lanthanoidPlaceholder = useMemo(() =>
    seriesPlaceholders.find(s => s.id === 'lanthanoids')!,
  []);

  const actinoidPlaceholder = useMemo(() =>
    seriesPlaceholders.find(s => s.id === 'actinoids')!,
  []);

  // Build period rows with placeholders
  const periods = useMemo(() => {
    const rows: (Element | SeriesPlaceholder | null)[][] = [];

    for (let period = 1; period <= 7; period++) {
      const row: (Element | SeriesPlaceholder | null)[] = new Array(18).fill(null);

      allElements.forEach(el => {
        const pos = TABLE_POSITIONS[el.atomicNumber];
        if (pos && pos.period === period && !pos.isLanthanide && !pos.isActinide) {
          row[pos.group - 1] = el;
        }
      });

      // Insert Ln placeholder in period 6, group 3 (between Ba and Hf)
      if (period === 6) {
        row[2] = lanthanoidPlaceholder;
      }
      // Insert An placeholder in period 7, group 3 (between Ra and Rf)
      if (period === 7) {
        row[2] = actinoidPlaceholder;
      }

      rows.push(row);
    }

    return rows;
  }, [lanthanoidPlaceholder, actinoidPlaceholder]);

  // Get lanthanides and actinides
  const lanthanides = useMemo(() =>
    getLanthanides(allElements).map(n => elementMap.get(n)!),
  [elementMap]);

  const actinides = useMemo(() =>
    getActinides(allElements).map(n => elementMap.get(n)!),
  [elementMap]);

  // Helper to check if an item is a SeriesPlaceholder
  const isSeriesPlaceholder = (item: Element | SeriesPlaceholder): item is SeriesPlaceholder => {
    return 'elementNumbers' in item;
  };

  // Calculate if series placeholders should be in active group (highlighted)
  const isSeriesActiveGroup = (series: SeriesPlaceholder): boolean => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;

    // Show as active if hovering a matching category (this enables the colored styling)
    if (hasHoveredCategory && series.category === hoveredCategory) {
      return true;
    }

    // Only show as active if category filter is active and matches (and no threat filter)
    if (hasActiveCategories && !hasActiveThreats) {
      return activeCategories.has(series.category);
    }

    return false;
  };

  // Calculate if series placeholders should be dimmed
  const isSeriesNoFocus = (series: SeriesPlaceholder): boolean => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;

    // If no filters, not dimmed
    if (!hasActiveCategories && !hasActiveThreats && !hasHoveredCategory && !hasHoveredThreat) {
      return false;
    }

    // If being hovered directly, not dimmed
    if (hoveredSeriesId === series.id) {
      return false;
    }

    // Check if series category matches filters
    const matchesActiveCategory = hasActiveCategories ? activeCategories.has(series.category) : true;
    const matchesHoveredCategory = hasHoveredCategory && series.category === hoveredCategory;

    // If hovering a category that matches this series, don't dim
    if (matchesHoveredCategory) {
      return false;
    }

    // Series don't have threat levels, so they're dimmed if threat filter is active
    if (hasActiveThreats && !hasActiveCategories) {
      return true; // Dim if only threat filter is active (series have no threats)
    }

    if (hasActiveCategories || hasActiveThreats) {
      if (!matchesActiveCategory) {
        return true;
      }
      // If threat is also active, series should be dimmed (no threat level)
      if (hasActiveThreats) {
        return true;
      }
    } else if (hasHoveredCategory || hasHoveredThreat) {
      // Only hover active, no click filters
      if (hasHoveredThreat) {
        return true; // Series have no threats
      }
      // If hovering a category that doesn't match, dim
      if (hasHoveredCategory && !matchesHoveredCategory) {
        return true;
      }
    }

    return false;
  };

  const renderCell = (item: Element | SeriesPlaceholder | null, index: number) => {
    if (!item) {
      return <EmptyCell key={`empty-${index}`} />;
    }

    // Check if this is a series placeholder
    if (isSeriesPlaceholder(item)) {
      const isHovered = hoveredSeriesId === item.id;
      const shouldBeNoFocus = isSeriesNoFocus(item) && !isHovered;

      return (
        <SeriesPlaceholderCell
          key={`series-${item.id}`}
          series={item}
          isNoFocus={shouldBeNoFocus}
          isActiveGroup={isSeriesActiveGroup(item)}
          isFocusGroup={isSeriesDetailOpen && selectedSeries?.id === item.id}
          onClick={() => onSeriesClick(item)}
          onMouseEnter={() => onSeriesHover(item.id)}
          onMouseLeave={() => onSeriesHover(null)}
        />
      );
    }

    // Regular element
    const isHovered = hoveredElementNumber === item.atomicNumber;
    const shouldBeNoFocus = noFocusSet.has(item.atomicNumber) && !isHovered;

    return (
      <ElementCell
        key={item.atomicNumber}
        element={item}
        isNoFocus={shouldBeNoFocus}
        isActiveGroup={activeGroupSet.has(item.atomicNumber)}
        isFocusGroup={isDetailOpen && selectedElement?.atomicNumber === item.atomicNumber}
        onClick={() => onElementClick(item)}
        onMouseEnter={() => onElementHover(item.atomicNumber)}
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
