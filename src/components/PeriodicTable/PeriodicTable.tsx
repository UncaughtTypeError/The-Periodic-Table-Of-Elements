import { useMemo } from 'react';
import type { Element, ElementCategory, ThreatLevel, LegendFilter, SeriesPlaceholder, SeriesType } from '@/types';
import { elements as allElements } from '@/data/elements';
import { matchesLegendValue, matchesAnyLegendFilter } from '@/utils/filterMatching';
import { seriesPlaceholders } from '@/data/series';
import { TABLE_POSITIONS, getLanthanides, getActinides } from '@/data/tableLayout';
import { ElementCell, EmptyCell, LabelCell, SeriesPlaceholderCell } from '@/components/Element';
import styles from './PeriodicTable.module.css';

interface PeriodicTableProps {
  activeCategories: Set<ElementCategory>;
  hoveredCategory: ElementCategory | null;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  hoveredThreatLevel: ThreatLevel;
  activeLegendFilters: Set<LegendFilter>;
  hoveredLegendFilter: LegendFilter | null;
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
  activeLegendFilters,
  hoveredLegendFilter,
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
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;
    const hasHoveredLegend = hoveredLegendFilter !== null;

    // No filters active - everything normal
    if (!hasActiveCategories && !hasActiveThreats && !hasActiveLegend && !hasHoveredCategory && !hasHoveredThreat && !hasHoveredLegend) {
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

      // Check if element matches active legend filters (OR within)
      const matchesActiveLegend = hasActiveLegend
        ? matchesAnyLegendFilter(el, activeLegendFilters)
        : true;

      // Check if element matches hovered category (when other categories are active)
      const matchesHoveredCategory = hasHoveredCategory && el.category === hoveredCategory;

      // Check if element matches hovered threat
      const matchesHoveredThreat = hasHoveredThreat
        ? (el.threatLevel !== null && el.threatLevel === hoveredThreatLevel)
        : false;

      // Check if element matches hovered legend filter
      const matchesHoveredLegend = hasHoveredLegend
        ? matchesLegendValue(el, hoveredLegendFilter)
        : false;

      // Determine if element should be in activeGroup (highlighted with background)
      // This happens when element matches ALL active filters (category AND threat AND legend)
      if (hasActiveCategories || hasActiveThreats || hasActiveLegend) {
        const matchesAllActiveFilters = matchesActiveCategory && matchesActiveThreat && matchesActiveLegend;
        if (matchesAllActiveFilters) {
          activeGroup.add(el.atomicNumber);
        }
      }

      // Determine if element should be noFocus (dimmed)
      let shouldBeDimmed = false;

      if (hasActiveCategories || hasActiveThreats || hasActiveLegend) {
        // Start by checking if element matches all active filters
        const matchesAllActiveFilters = matchesActiveCategory && matchesActiveThreat && matchesActiveLegend;

        if (!matchesAllActiveFilters) {
          // Element doesn't match all active filters, so it should be dimmed...
          // UNLESS it matches the currently hovered filter
          if (hasHoveredCategory && matchesHoveredCategory) {
            shouldBeDimmed = false;
          } else if (hasHoveredThreat && matchesHoveredThreat) {
            if (!hasActiveCategories || matchesActiveCategory) {
              shouldBeDimmed = false;
            } else {
              shouldBeDimmed = true;
            }
          } else if (hasHoveredLegend && matchesHoveredLegend) {
            // Don't dim - hovering shows this legend filter even when other filters are active
            // But only if it also matches other active filters
            const matchesOtherActive = matchesActiveCategory && matchesActiveThreat;
            if (!hasActiveCategories && !hasActiveThreats || matchesOtherActive) {
              shouldBeDimmed = false;
            } else {
              shouldBeDimmed = true;
            }
          } else {
            shouldBeDimmed = true;
          }
        }
      } else if (hasHoveredCategory || hasHoveredThreat || hasHoveredLegend) {
        // Only hover active, no click filters
        let matchesHover = false;
        if (hasHoveredCategory) matchesHover = matchesHoveredCategory;
        else if (hasHoveredThreat) matchesHover = matchesHoveredThreat;
        else if (hasHoveredLegend) matchesHover = matchesHoveredLegend;

        if (!matchesHover) {
          shouldBeDimmed = true;
        }
      }

      if (shouldBeDimmed) {
        noFocus.add(el.atomicNumber);
      }
    });

    return { activeGroupSet: activeGroup, noFocusSet: noFocus };
  }, [activeCategories, hoveredCategory, activeThreatLevels, hoveredThreatLevel, activeLegendFilters, hoveredLegendFilter]);

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
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;

    // Show as active if hovering a matching category (this enables the colored styling)
    if (hasHoveredCategory && series.category === hoveredCategory) {
      return true;
    }

    // Only show as active if category filter is active and matches (and no threat or legend filter)
    if (hasActiveCategories && !hasActiveThreats && !hasActiveLegend) {
      return activeCategories.has(series.category);
    }

    return false;
  };

  // Calculate if series placeholders should be dimmed
  const isSeriesNoFocus = (series: SeriesPlaceholder): boolean => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;
    const hasHoveredLegend = hoveredLegendFilter !== null;

    // If no filters, not dimmed
    if (!hasActiveCategories && !hasActiveThreats && !hasActiveLegend && !hasHoveredCategory && !hasHoveredThreat && !hasHoveredLegend) {
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

    // Series don't have threat levels or legend properties, so they're dimmed if those filters are active
    if ((hasActiveThreats || hasActiveLegend) && !hasActiveCategories) {
      return true;
    }

    if (hasActiveCategories || hasActiveThreats || hasActiveLegend) {
      if (!matchesActiveCategory) {
        return true;
      }
      // If threat or legend is also active, series should be dimmed (no threat level / no state)
      if (hasActiveThreats || hasActiveLegend) {
        return true;
      }
    } else if (hasHoveredCategory || hasHoveredThreat || hasHoveredLegend) {
      // Only hover active, no click filters
      if (hasHoveredThreat || hasHoveredLegend) {
        return true; // Series have no threats or legend properties
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
          <EmptyCell />
          <LabelCell label="Ln Series" />
          {lanthanides.map(element => renderCell(element, element.atomicNumber))}
          <EmptyCell />
        </div>

        {/* Actinides */}
        <div className={styles.fBlockRow}>
          <EmptyCell />
          <LabelCell label="An Series" />
          {actinides.map(element => renderCell(element, element.atomicNumber))}
          <EmptyCell />
        </div>
      </div>
    </div>
  );
}
