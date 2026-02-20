import { useMemo } from 'react';
import type {
  Element,
  ElementCategory,
  ThreatLevel,
  LegendFilter,
  ElectronBlock,
  SeriesPlaceholder,
  SeriesType,
} from '@/types';
import { elements as allElements } from '@/data/elements';
import {
  matchesLegendValue,
  matchesAnyLegendFilter,
  matchesBlockFilter,
  matchesAnyBlockFilter,
} from '@/utils/filterMatching';
import { seriesPlaceholders } from '@/data/series';
import {
  TABLE_POSITIONS,
  getLanthanides,
  getActinides,
} from '@/data/tableLayout';
import {
  ElementCell,
  EmptyCell,
  LabelCell,
  SeriesPlaceholderCell,
} from '@/components/Element';
import styles from './PeriodicTable.module.css';

interface PeriodicTableProps {
  activeCategories: Set<ElementCategory>;
  hoveredCategory: ElementCategory | null;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  hoveredThreatLevel: ThreatLevel;
  activeLegendFilters: Set<LegendFilter>;
  hoveredLegendFilter: LegendFilter | null;
  activeBlockFilters: Set<ElectronBlock>;
  hoveredBlockFilter: ElectronBlock | null;
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
  activeBlockFilters,
  hoveredBlockFilter,
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
    allElements.forEach((el) => map.set(el.atomicNumber, el));
    return map;
  }, []);

  // Calculate which elements should be highlighted/dimmed/activeGroup
  const { activeGroupSet, noFocusSet } = useMemo(() => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasActiveBlocks = activeBlockFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;
    const hasHoveredLegend = hoveredLegendFilter !== null;
    const hasHoveredBlock = hoveredBlockFilter !== null;

    const hasAnyActive =
      hasActiveCategories ||
      hasActiveThreats ||
      hasActiveLegend ||
      hasActiveBlocks;
    const hasAnyHovered =
      hasHoveredCategory ||
      hasHoveredThreat ||
      hasHoveredLegend ||
      hasHoveredBlock;

    // No filters active - everything normal
    if (!hasAnyActive && !hasAnyHovered) {
      return {
        activeGroupSet: new Set<number>(),
        noFocusSet: new Set<number>(),
      };
    }

    const activeGroup = new Set<number>();
    const noFocus = new Set<number>();

    allElements.forEach((el) => {
      // Check if element matches active category filters
      const matchesActiveCategory = hasActiveCategories
        ? activeCategories.has(el.category)
        : true;

      // Check if element matches active threat filters
      const matchesActiveThreat = hasActiveThreats
        ? el.threatLevel !== null && activeThreatLevels.has(el.threatLevel)
        : true;

      // Check if element matches active legend filters (OR within)
      const matchesActiveLegend = hasActiveLegend
        ? matchesAnyLegendFilter(el, activeLegendFilters)
        : true;

      // Check if element matches active block filters (OR within)
      const matchesActiveBlock = hasActiveBlocks
        ? matchesAnyBlockFilter(el, activeBlockFilters)
        : true;

      // Check if element matches hovered category (when other categories are active)
      const matchesHoveredCategory =
        hasHoveredCategory && el.category === hoveredCategory;

      // Check if element matches hovered threat
      const matchesHoveredThreat = hasHoveredThreat
        ? el.threatLevel !== null && el.threatLevel === hoveredThreatLevel
        : false;

      // Check if element matches hovered legend filter
      const matchesHoveredLegend = hasHoveredLegend
        ? matchesLegendValue(el, hoveredLegendFilter)
        : false;

      // Check if element matches hovered block filter
      const matchesHoveredBlock = hasHoveredBlock
        ? matchesBlockFilter(el, hoveredBlockFilter)
        : false;

      // Determine if element should be in activeGroup (highlighted with background)
      // This happens when element matches ALL active filters
      if (hasAnyActive) {
        const matchesAllActiveFilters =
          matchesActiveCategory &&
          matchesActiveThreat &&
          matchesActiveLegend &&
          matchesActiveBlock;
        if (matchesAllActiveFilters) {
          activeGroup.add(el.atomicNumber);
        }
      }

      // Determine if element should be noFocus (dimmed)
      let shouldBeDimmed = false;

      if (hasAnyActive) {
        // Start by checking if element matches all active filters
        const matchesAllActiveFilters =
          matchesActiveCategory &&
          matchesActiveThreat &&
          matchesActiveLegend &&
          matchesActiveBlock;

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
            const matchesOtherActive =
              matchesActiveCategory && matchesActiveThreat;
            if (
              (!hasActiveCategories && !hasActiveThreats) ||
              matchesOtherActive
            ) {
              shouldBeDimmed = false;
            } else {
              shouldBeDimmed = true;
            }
          } else if (hasHoveredBlock && matchesHoveredBlock) {
            const matchesOtherActive =
              matchesActiveCategory &&
              matchesActiveThreat &&
              matchesActiveLegend;
            if (
              (!hasActiveCategories && !hasActiveThreats && !hasActiveLegend) ||
              matchesOtherActive
            ) {
              shouldBeDimmed = false;
            } else {
              shouldBeDimmed = true;
            }
          } else {
            shouldBeDimmed = true;
          }
        }
      } else if (hasAnyHovered) {
        // Only hover active, no click filters
        let matchesHover = false;
        if (hasHoveredCategory) matchesHover = matchesHoveredCategory;
        else if (hasHoveredThreat) matchesHover = matchesHoveredThreat;
        else if (hasHoveredLegend) matchesHover = matchesHoveredLegend;
        else if (hasHoveredBlock) matchesHover = matchesHoveredBlock;

        if (!matchesHover) {
          shouldBeDimmed = true;
        }
      }

      if (shouldBeDimmed) {
        noFocus.add(el.atomicNumber);
      }
    });

    return { activeGroupSet: activeGroup, noFocusSet: noFocus };
  }, [
    activeCategories,
    hoveredCategory,
    activeThreatLevels,
    hoveredThreatLevel,
    activeLegendFilters,
    hoveredLegendFilter,
    activeBlockFilters,
    hoveredBlockFilter,
  ]);

  // Get series placeholders
  const lanthanoidPlaceholder = useMemo(
    () => seriesPlaceholders.find((s) => s.id === 'lanthanoids')!,
    [],
  );

  const actinoidPlaceholder = useMemo(
    () => seriesPlaceholders.find((s) => s.id === 'actinoids')!,
    [],
  );

  // Build period rows with placeholders (19 columns)
  const periods = useMemo(() => {
    const rows: (Element | SeriesPlaceholder | null)[][] = [];

    for (let period = 1; period <= 7; period++) {
      const row: (Element | SeriesPlaceholder | null)[] = new Array(19).fill(
        null,
      );

      allElements.forEach((el) => {
        const pos = TABLE_POSITIONS[el.atomicNumber];
        if (
          pos &&
          pos.period === period &&
          !pos.isLanthanide &&
          !pos.isActinide
        ) {
          const col = pos.group <= 2 ? pos.group - 1 : pos.group;
          row[col] = el;
        }
      });

      // Insert Ln/An placeholders in column index 2 (before Lu/Lr at col 3)
      if (period === 6) {
        row[2] = lanthanoidPlaceholder;
      }
      if (period === 7) {
        row[2] = actinoidPlaceholder;
      }

      rows.push(row);
    }

    return rows;
  }, [lanthanoidPlaceholder, actinoidPlaceholder]);

  // Get lanthanides and actinides
  const lanthanides = useMemo(
    () => getLanthanides(allElements).map((n) => elementMap.get(n)!),
    [elementMap],
  );

  const actinides = useMemo(
    () => getActinides(allElements).map((n) => elementMap.get(n)!),
    [elementMap],
  );

  // Helper to check if an item is a SeriesPlaceholder
  const isSeriesPlaceholder = (
    item: Element | SeriesPlaceholder,
  ): item is SeriesPlaceholder => {
    return 'elementNumbers' in item;
  };

  // Calculate if series placeholders should be in active group (highlighted)
  const isSeriesActiveGroup = (series: SeriesPlaceholder): boolean => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasActiveBlocks = activeBlockFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredBlock = hoveredBlockFilter !== null;

    // Show as active if hovering a matching category
    if (hasHoveredCategory && series.category === hoveredCategory) {
      return true;
    }

    // Show as active if hovering f-block (all lanthanoids/actinoids are f-block)
    if (hasHoveredBlock && hoveredBlockFilter === 'f-block') {
      return true;
    }

    // Only show as active if category filter is active and matches (and no threat/legend filter)
    if (hasActiveCategories && !hasActiveThreats && !hasActiveLegend) {
      const matchesCategory = activeCategories.has(series.category);
      // If block filter is also active, series must also match block
      if (hasActiveBlocks) {
        return matchesCategory && activeBlockFilters.has('f-block');
      }
      return matchesCategory;
    }

    // If only block filter is active, show as active if f-block is selected
    if (
      hasActiveBlocks &&
      !hasActiveCategories &&
      !hasActiveThreats &&
      !hasActiveLegend
    ) {
      return activeBlockFilters.has('f-block');
    }

    return false;
  };

  // Calculate if series placeholders should be dimmed
  const isSeriesNoFocus = (series: SeriesPlaceholder): boolean => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasActiveBlocks = activeBlockFilters.size > 0;
    const hasHoveredCategory = hoveredCategory !== null;
    const hasHoveredThreat = hoveredThreatLevel !== null;
    const hasHoveredLegend = hoveredLegendFilter !== null;
    const hasHoveredBlock = hoveredBlockFilter !== null;

    const hasAnyActive =
      hasActiveCategories ||
      hasActiveThreats ||
      hasActiveLegend ||
      hasActiveBlocks;
    const hasAnyHovered =
      hasHoveredCategory ||
      hasHoveredThreat ||
      hasHoveredLegend ||
      hasHoveredBlock;

    // If no filters, not dimmed
    if (!hasAnyActive && !hasAnyHovered) {
      return false;
    }

    // If being hovered directly, not dimmed
    if (hoveredSeriesId === series.id) {
      return false;
    }

    // Check if series category matches filters
    const matchesActiveCategory = hasActiveCategories
      ? activeCategories.has(series.category)
      : true;
    const matchesHoveredCategory =
      hasHoveredCategory && series.category === hoveredCategory;
    // All lanthanoids/actinoids are f-block
    const matchesActiveBlock = hasActiveBlocks
      ? activeBlockFilters.has('f-block')
      : true;
    const matchesHoveredBlock =
      hasHoveredBlock && hoveredBlockFilter === 'f-block';

    // If hovering a category that matches this series, don't dim
    if (matchesHoveredCategory) {
      return false;
    }

    // If hovering f-block, don't dim (series are f-block)
    if (matchesHoveredBlock) {
      return false;
    }

    // Series don't have threat levels or legend properties, so they're dimmed if those filters are active
    if (
      (hasActiveThreats || hasActiveLegend) &&
      !hasActiveCategories &&
      !hasActiveBlocks
    ) {
      return true;
    }

    if (hasAnyActive) {
      if (!matchesActiveCategory || !matchesActiveBlock) {
        return true;
      }
      // If threat or legend is also active, series should be dimmed (no threat level / no state)
      if (hasActiveThreats || hasActiveLegend) {
        return true;
      }
    } else if (hasAnyHovered) {
      // Only hover active, no click filters
      if (hasHoveredThreat || hasHoveredLegend) {
        return true; // Series have no threats or legend properties
      }
      if (hasHoveredBlock && !matchesHoveredBlock) {
        return true; // Hovering a non-f-block dims the series
      }
      // If hovering a category that doesn't match, dim
      if (hasHoveredCategory && !matchesHoveredCategory) {
        return true;
      }
    }

    return false;
  };

  // Group label positions: maps "periodIndex-colIndex" to group number
  // Each group label sits in the empty cell directly above the first element in that column
  // 19-col layout: groups 1-2 at indices 0-1, Lu/Lr at index 2 (no label), groups 3-18 at indices 3-18
  const groupLabelPositions = useMemo(() => {
    const positions = new Map<string, number>();
    // Period 1 (index 0): group 2 at col 1, groups 13-17 at cols 13-17
    positions.set('0-1', 2);
    [13, 14, 15, 16, 17].forEach((col) => positions.set(`0-${col}`, col));
    // Period 3 (index 2): groups 3-12 at cols 3-12
    for (let col = 3; col <= 12; col++) positions.set(`2-${col}`, col);
    return positions;
  }, []);

  const renderCell = (
    item: Element | SeriesPlaceholder | null,
    index: number,
  ) => {
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
        isFocusGroup={
          isDetailOpen && selectedElement?.atomicNumber === item.atomicNumber
        }
        onClick={() => onElementClick(item)}
        onMouseEnter={() => onElementHover(item.atomicNumber)}
        onMouseLeave={() => onElementHover(null)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWithAxes}>
        {/* Periods axis label (vertical) */}
        <div className={styles.periodsAxis}>
          <svg width="8" height="30" viewBox="0 0 8 30" aria-hidden="true">
            <path
              d="M4 0 L4 26 M1 23 L4 28 L7 23"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>Periods</span>
        </div>

        <div className={styles.tableColumn}>
          {/* Groups axis label (horizontal) */}
          <div className={styles.groupsAxis}>
            <span>Groups</span>
            <svg width="30" height="8" viewBox="0 0 30 8" aria-hidden="true">
              <path
                d="M0 4 L26 4 M23 1 L28 4 L23 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className={styles.table}>
            {/* Group header row (for groups 1 and 18 which have no empty cell above) */}
            <div className={styles.headerRow}>
              <div className={styles.periodLabelSpacer} />
              {Array.from({ length: 19 }, (_, i) => {
                if (i === 0 || i === 18) {
                  const group = i === 0 ? 1 : 18;
                  return (
                    <div key={`gh-${i}`} className={styles.groupLabel}>
                      {group}
                    </div>
                  );
                }
                return (
                  <div key={`gh-${i}`} className={styles.groupLabelEmpty} />
                );
              })}
            </div>

            {/* Period rows */}
            {periods.map((row, periodIndex) => (
              <div key={`period-${periodIndex + 1}`} className={styles.period}>
                <div className={styles.periodLabel}>{periodIndex + 1}</div>
                {row.map((element, groupIndex) => {
                  if (!element) {
                    const groupLabel = groupLabelPositions.get(
                      `${periodIndex}-${groupIndex}`,
                    );
                    if (groupLabel !== undefined) {
                      return (
                        <div
                          key={`gl-${groupLabel}`}
                          className={styles.groupLabel}
                        >
                          {groupLabel}
                        </div>
                      );
                    }
                  }
                  return renderCell(element, groupIndex);
                })}
              </div>
            ))}

            <div className={styles.separator} />

            {/* Lanthanides */}
            <div className={styles.fBlockRow}>
              <div className={styles.periodLabelSpacer} />
              <EmptyCell />
              <LabelCell label="Ln Series" />
              {lanthanides.map((element) =>
                renderCell(element, element.atomicNumber),
              )}
              <EmptyCell />
              <EmptyCell />
              <EmptyCell />
            </div>

            {/* Actinides */}
            <div className={styles.fBlockRow}>
              <div className={styles.periodLabelSpacer} />
              <EmptyCell />
              <LabelCell label="An Series" />
              {actinides.map((element) =>
                renderCell(element, element.atomicNumber),
              )}
              <EmptyCell />
              <EmptyCell />
              <EmptyCell />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
