import type { Element, LegendFilter, ElectronBlock } from '@/types';
import { getStandardState, isRadioactive, getNaturalOccurrence } from '@/data';

/** Check if an element matches a single legend filter value */
export function matchesLegendValue(el: Element, filter: LegendFilter): boolean {
  if (filter === 'radioactive') return isRadioactive(el.symbol);
  if (
    filter === 'primordial' ||
    filter === 'from-decay' ||
    filter === 'synthetic'
  ) {
    return getNaturalOccurrence(el.symbol) === filter;
  }
  return getStandardState(el.symbol) === filter;
}

/** Check if element matches any active legend filter (OR within) */
export function matchesAnyLegendFilter(
  el: Element,
  filters: Set<LegendFilter>,
): boolean {
  for (const f of filters) {
    if (matchesLegendValue(el, f)) return true;
  }
  return false;
}

/** Get the electron block for an element */
export function getElementBlock(el: Element): ElectronBlock | null {
  return (el.detail.general.block as ElectronBlock) ?? null;
}

/** Check if an element matches a single block filter */
export function matchesBlockFilter(el: Element, block: ElectronBlock): boolean {
  return el.detail.general.block === block;
}

/** Check if element matches any active block filter (OR within) */
export function matchesAnyBlockFilter(
  el: Element,
  blocks: Set<ElectronBlock>,
): boolean {
  for (const b of blocks) {
    if (matchesBlockFilter(el, b)) return true;
  }
  return false;
}
