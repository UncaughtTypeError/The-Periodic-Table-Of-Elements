import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePeriodicTableState } from './usePeriodicTableState';
import type { Element } from '../types';

const mockElement: Element = {
  symbol: 'H',
  name: 'Hydrogen',
  atomicNumber: 1,
  atomicMass: 1.008,
  isSynthetic: false,
  category: 'other-nonmetals',
  threatLevel: null,
  period: 1,
  group: 1,
  electronShells: { K: 1, L: null, M: null, N: null, O: null, P: null, Q: null },
  summary: {
    atomicMass: '1.00794 u',
    boilingPoint: '-252.9 °C',
    electronConfiguration: '1s1',
    electronegativity: '2.2',
    atomicRadius: null,
    ionRadius: null,
    vanDerWaalsRadius: null,
    ionizationEnergy: null,
    electronAffinity: null,
    oxidationStates: null,
    standardState: null,
    bondingType: null,
    meltingPoint: null,
    density: null,
    discovered: '1766',
    discoverer: 'Henry Cavendish',
  },
  detail: {
    description: ['Hydrogen is a chemical element.'],
    general: {
      appearance: 'colorless gas',
      group: 'group 1',
      block: 's-block',
      period: 'period 1',
      elementCategory: 'diatomic nonmetal',
      electronConfiguration: '1s1',
      perShell: '1',
    },
    physical: {
      color: 'colorless',
      phase: 'gas',
      meltingPoint: '13.99 K',
      boilingPoint: '20.271 K',
      density: null,
    },
    history: {
      discovery: 'Henry Cavendish (1766)',
      namedBy: 'Antoine Lavoisier (1783)',
      naming: null,
      firstIsolation: null,
    },
  },
};

const mockElement2: Element = {
  ...mockElement,
  symbol: 'He',
  name: 'Helium',
  atomicNumber: 2,
  category: 'noble-gases',
  threatLevel: 'serious',
};

describe('usePeriodicTableState', () => {
  describe('initial state', () => {
    it('should have null activeCategory initially', () => {
      const { result } = renderHook(() => usePeriodicTableState());
      expect(result.current.state.activeCategory).toBeNull();
    });

    it('should have null hoveredCategory initially', () => {
      const { result } = renderHook(() => usePeriodicTableState());
      expect(result.current.state.hoveredCategory).toBeNull();
    });

    it('should have null activeThreatLevel initially', () => {
      const { result } = renderHook(() => usePeriodicTableState());
      expect(result.current.state.activeThreatLevel).toBeNull();
    });

    it('should have null selectedElement initially', () => {
      const { result } = renderHook(() => usePeriodicTableState());
      expect(result.current.state.selectedElement).toBeNull();
    });

    it('should have isDetailOpen as false initially', () => {
      const { result } = renderHook(() => usePeriodicTableState());
      expect(result.current.state.isDetailOpen).toBe(false);
    });
  });

  describe('setActiveCategory', () => {
    it('should set active category', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setActiveCategory('noble-gases');
      });

      expect(result.current.state.activeCategory).toBe('noble-gases');
    });

    it('should toggle off when same category is clicked', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setActiveCategory('noble-gases');
      });

      act(() => {
        result.current.actions.setActiveCategory('noble-gases');
      });

      expect(result.current.state.activeCategory).toBeNull();
    });

    it('should switch to different category', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setActiveCategory('noble-gases');
      });

      act(() => {
        result.current.actions.setActiveCategory('halogens');
      });

      expect(result.current.state.activeCategory).toBe('halogens');
    });
  });

  describe('setHoveredCategory', () => {
    it('should set hovered category', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setHoveredCategory('transition-metals');
      });

      expect(result.current.state.hoveredCategory).toBe('transition-metals');
    });

    it('should clear hovered category when set to null', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setHoveredCategory('transition-metals');
      });

      act(() => {
        result.current.actions.setHoveredCategory(null);
      });

      expect(result.current.state.hoveredCategory).toBeNull();
    });
  });

  describe('setActiveThreatLevel', () => {
    it('should set active threat level', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setActiveThreatLevel('serious');
      });

      expect(result.current.state.activeThreatLevel).toBe('serious');
    });

    it('should toggle off when same threat level is clicked', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setActiveThreatLevel('serious');
      });

      act(() => {
        result.current.actions.setActiveThreatLevel('serious');
      });

      expect(result.current.state.activeThreatLevel).toBeNull();
    });
  });

  describe('setHoveredThreatLevel', () => {
    it('should set hovered threat level', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.setHoveredThreatLevel('rising');
      });

      expect(result.current.state.hoveredThreatLevel).toBe('rising');
    });
  });

  describe('selectElement', () => {
    it('should select element and open detail panel', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.selectElement(mockElement);
      });

      expect(result.current.state.selectedElement).toEqual(mockElement);
      expect(result.current.state.isDetailOpen).toBe(true);
    });

    it('should close panel when same element is selected again (keeps element for animation)', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.selectElement(mockElement);
      });

      act(() => {
        result.current.actions.selectElement(mockElement);
      });

      // Element is kept for animation purposes
      expect(result.current.state.selectedElement).toEqual(mockElement);
      expect(result.current.state.isDetailOpen).toBe(false);
    });

    it('should switch to different element', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.selectElement(mockElement);
      });

      act(() => {
        result.current.actions.selectElement(mockElement2);
      });

      expect(result.current.state.selectedElement).toEqual(mockElement2);
      expect(result.current.state.isDetailOpen).toBe(true);
    });
  });

  describe('closeDetail', () => {
    it('should close detail panel but keep selected element for animation', () => {
      const { result } = renderHook(() => usePeriodicTableState());

      act(() => {
        result.current.actions.selectElement(mockElement);
      });

      act(() => {
        result.current.actions.closeDetail();
      });

      // Element is kept for animation purposes
      expect(result.current.state.selectedElement).toEqual(mockElement);
      expect(result.current.state.isDetailOpen).toBe(false);
    });
  });
});
