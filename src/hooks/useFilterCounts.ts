import { useMemo } from 'react';
import type { ElementCategory, ThreatLevel, LegendFilter } from '@/types';
import { elements } from '@/data/elements';
import {
  matchesLegendValue,
  matchesAnyLegendFilter,
} from '@/utils/filterMatching';

interface FilterCountsInput {
  activeCategories: Set<ElementCategory>;
  activeThreatLevels: Set<NonNullable<ThreatLevel>>;
  activeLegendFilters: Set<LegendFilter>;
}

export interface FilterCounts {
  activeCount: number | null;
  categoryCounts: Map<ElementCategory, number>;
  threatCounts: Map<NonNullable<ThreatLevel>, number>;
  legendCounts: Map<LegendFilter, number>;
}

export function useFilterCounts({
  activeCategories,
  activeThreatLevels,
  activeLegendFilters,
}: FilterCountsInput): FilterCounts {
  return useMemo(() => {
    const hasActiveCategories = activeCategories.size > 0;
    const hasActiveThreats = activeThreatLevels.size > 0;
    const hasActiveLegend = activeLegendFilters.size > 0;
    const hasAnyFilter =
      hasActiveCategories || hasActiveThreats || hasActiveLegend;

    let activeCount = 0;
    const categoryCounts = new Map<ElementCategory, number>();
    const threatCounts = new Map<NonNullable<ThreatLevel>, number>();
    const legendCounts = new Map<LegendFilter, number>();

    for (const el of elements) {
      const matchesCategory =
        !hasActiveCategories || activeCategories.has(el.category);
      const matchesThreat =
        !hasActiveThreats ||
        (el.threatLevel !== null && activeThreatLevels.has(el.threatLevel));
      const matchesLegend =
        !hasActiveLegend || matchesAnyLegendFilter(el, activeLegendFilters);

      // Active count: matches ALL active filters
      if (hasAnyFilter && matchesCategory && matchesThreat && matchesLegend) {
        activeCount++;
      }

      // Category counts: elements matching this category AND active threat + legend filters
      if (matchesThreat && matchesLegend) {
        categoryCounts.set(
          el.category,
          (categoryCounts.get(el.category) ?? 0) + 1,
        );
      }

      // Threat counts: elements matching this threat AND active category + legend filters
      if (el.threatLevel !== null && matchesCategory && matchesLegend) {
        threatCounts.set(
          el.threatLevel,
          (threatCounts.get(el.threatLevel) ?? 0) + 1,
        );
      }

      // Legend counts: elements matching each legend value AND active category + threat filters
      if (matchesCategory && matchesThreat) {
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
    }

    return {
      activeCount: hasAnyFilter ? activeCount : null,
      categoryCounts,
      threatCounts,
      legendCounts,
    };
  }, [activeCategories, activeThreatLevels, activeLegendFilters]);
}
