import type { Element, LegendFilter } from '@/types';
import { getStandardState, isRadioactive } from '@/data';

/** Check if an element matches a single legend filter value */
export function matchesLegendValue(el: Element, filter: LegendFilter): boolean {
  if (filter === 'radioactive') return isRadioactive(el.symbol);
  return getStandardState(el.symbol) === filter;
}

/** Check if element matches any active legend filter (OR within) */
export function matchesAnyLegendFilter(el: Element, filters: Set<LegendFilter>): boolean {
  for (const f of filters) {
    if (matchesLegendValue(el, f)) return true;
  }
  return false;
}
