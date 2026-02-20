import { useMemo } from 'react';
import type {
  ElementCategory,
  ThreatLevel,
  LegendFilter,
  ElectronBlock,
} from '@/types';
import { elements } from '@/data/elements';
import {
  matchesLegendValue,
  matchesAnyLegendFilter,
  matchesBlockFilter,
  matchesAnyBlockFilter,
} from '@/utils/filterMatching';

interface FilterCountsInput {
  activeCategories: Set<ElementCategory>;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  activeLegendFilters: Set<LegendFilter>;
  activeBlockFilters: Set<ElectronBlock>;
}

export interface FilterCounts {
  activeCount: number | null;
  categoryCounts: Map<ElementCategory, number>;
  threatCounts: Map<NonNullable<ThreatLevel>, number>;
  legendCounts: Map<LegendFilter, number>;
  blockCounts: Map<ElectronBlock, number>;
}

export function useFilterCounts({
  activeCategories,
  activeThreatLevels,
  activeLegendFilters,
  activeBlockFilters,
}: FilterCountsInput): FilterCounts {
  return useMemo(() => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasActiveBlocks = activeBlockFilters.size > 0;
    const hasAnyFilter =
      hasActiveCategories ||
      hasActiveThreats ||
      hasActiveLegend ||
      hasActiveBlocks;

    let activeCount = 0;
    const categoryCounts = new Map<ElementCategory, number>();
    const threatCounts = new Map<NonNullable<ThreatLevel>, number>();
    const legendCounts = new Map<LegendFilter, number>();
    const blockCounts = new Map<ElectronBlock, number>();

    for (const el of elements) {
      const matchesCategory =
        !hasActiveCategories || activeCategories.has(el.category);
      const matchesThreat =
        !hasActiveThreats ||
        (el.threatLevel !== null && activeThreatLevels.has(el.threatLevel));
      const matchesLegend =
        !hasActiveLegend || matchesAnyLegendFilter(el, activeLegendFilters);
      const matchesBlock =
        !hasActiveBlocks || matchesAnyBlockFilter(el, activeBlockFilters);

      // Active count: matches ALL active filters
      if (
        hasAnyFilter &&
        matchesCategory &&
        matchesThreat &&
        matchesLegend &&
        matchesBlock
      ) {
        activeCount++;
      }

      // Category counts: elements matching this category AND all other active filters
      if (matchesThreat && matchesLegend && matchesBlock) {
        categoryCounts.set(
          el.category,
          (categoryCounts.get(el.category) ?? 0) + 1,
        );
      }

      // Threat counts: elements matching this threat AND all other active filters
      if (
        el.threatLevel !== null &&
        matchesCategory &&
        matchesLegend &&
        matchesBlock
      ) {
        threatCounts.set(
          el.threatLevel,
          (threatCounts.get(el.threatLevel) ?? 0) + 1,
        );
      }

      // Legend counts: elements matching each legend value AND all other active filters
      if (matchesCategory && matchesThreat && matchesBlock) {
        const legendValues: LegendFilter[] = [
          'solid',
          'liquid',
          'gas',
          'radioactive',
        ];
        for (const lv of legendValues) {
          if (matchesLegendValue(el, lv)) {
            legendCounts.set(lv, (legendCounts.get(lv) ?? 0) + 1);
          }
        }
      }

      // Block counts: elements matching each block AND all other active filters
      if (matchesCategory && matchesThreat && matchesLegend) {
        const blockValues: ElectronBlock[] = [
          's-block',
          'p-block',
          'd-block',
          'f-block',
        ];
        for (const bv of blockValues) {
          if (matchesBlockFilter(el, bv)) {
            blockCounts.set(bv, (blockCounts.get(bv) ?? 0) + 1);
          }
        }
      }
    }

    return {
      activeCount: hasAnyFilter ? activeCount : null,
      categoryCounts,
      threatCounts,
      legendCounts,
      blockCounts,
    };
  }, [
    activeCategories,
    activeThreatLevels,
    activeLegendFilters,
    activeBlockFilters,
  ]);
}
