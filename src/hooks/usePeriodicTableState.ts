import { useReducer, useCallback } from 'react';
import type { Element, ElementCategory, ThreatLevel, SeriesPlaceholder, SeriesType } from '@/types';

interface State {
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
}

type Action =
  | { type: 'TOGGLE_ACTIVE_CATEGORY'; payload: ElementCategory }
  | { type: 'SET_HOVERED_CATEGORY'; payload: ElementCategory | null }
  | { type: 'TOGGLE_ACTIVE_THREAT'; payload: NonNullable<ThreatLevel> }
  | { type: 'SET_HOVERED_THREAT'; payload: ThreatLevel }
  | { type: 'SET_HOVERED_ELEMENT'; payload: number | null }
  | { type: 'SET_HOVERED_SERIES'; payload: SeriesType | null }
  | { type: 'SELECT_ELEMENT'; payload: Element }
  | { type: 'SELECT_SERIES'; payload: SeriesPlaceholder }
  | { type: 'CLOSE_DETAIL' }
  | { type: 'CLOSE_SERIES_DETAIL' };

const initialState: State = {
  activeCategories: new Set(),
  hoveredCategory: null,
  activeThreatLevels: new Set(),
  hoveredThreatLevel: null,
  hoveredElementNumber: null,
  hoveredSeriesId: null,
  selectedElement: null,
  selectedSeries: null,
  isDetailOpen: false,
  isSeriesDetailOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_ACTIVE_CATEGORY': {
      const newCategories = new Set(state.activeCategories);
      if (newCategories.has(action.payload)) {
        newCategories.delete(action.payload);
      } else {
        newCategories.add(action.payload);
      }
      return {
        ...state,
        activeCategories: newCategories,
      };
    }

    case 'SET_HOVERED_CATEGORY':
      return {
        ...state,
        hoveredCategory: action.payload,
      };

    case 'TOGGLE_ACTIVE_THREAT': {
      const newThreats = new Set(state.activeThreatLevels);
      if (newThreats.has(action.payload)) {
        newThreats.delete(action.payload);
      } else {
        newThreats.add(action.payload);
      }
      return {
        ...state,
        activeThreatLevels: newThreats,
      };
    }

    case 'SET_HOVERED_THREAT':
      return {
        ...state,
        hoveredThreatLevel: action.payload,
      };

    case 'SET_HOVERED_ELEMENT':
      return {
        ...state,
        hoveredElementNumber: action.payload,
      };

    case 'SET_HOVERED_SERIES':
      return {
        ...state,
        hoveredSeriesId: action.payload,
      };

    case 'SELECT_ELEMENT':
      // If clicking the same element, close the panel (keep element for animation)
      if (state.selectedElement?.atomicNumber === action.payload.atomicNumber) {
        return {
          ...state,
          isDetailOpen: false,
        };
      }
      return {
        ...state,
        selectedElement: action.payload,
        isDetailOpen: true,
      };

    case 'CLOSE_DETAIL':
      return {
        ...state,
        // Keep selectedElement so animation can complete
        isDetailOpen: false,
      };

    case 'SELECT_SERIES':
      // If clicking the same series, close the panel
      if (state.selectedSeries?.id === action.payload.id) {
        return {
          ...state,
          isSeriesDetailOpen: false,
        };
      }
      return {
        ...state,
        selectedSeries: action.payload,
        isSeriesDetailOpen: true,
        // Close element detail if open
        isDetailOpen: false,
      };

    case 'CLOSE_SERIES_DETAIL':
      return {
        ...state,
        isSeriesDetailOpen: false,
      };

    default:
      return state;
  }
}

export function usePeriodicTableState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleActiveCategory = useCallback((category: ElementCategory) => {
    dispatch({ type: 'TOGGLE_ACTIVE_CATEGORY', payload: category });
  }, []);

  const setHoveredCategory = useCallback((category: ElementCategory | null) => {
    dispatch({ type: 'SET_HOVERED_CATEGORY', payload: category });
  }, []);

  const toggleActiveThreatLevel = useCallback((threat: NonNullable<ThreatLevel>) => {
    dispatch({ type: 'TOGGLE_ACTIVE_THREAT', payload: threat });
  }, []);

  const setHoveredThreatLevel = useCallback((threat: ThreatLevel) => {
    dispatch({ type: 'SET_HOVERED_THREAT', payload: threat });
  }, []);

  const setHoveredElement = useCallback((atomicNumber: number | null) => {
    dispatch({ type: 'SET_HOVERED_ELEMENT', payload: atomicNumber });
  }, []);

  const setHoveredSeries = useCallback((seriesId: SeriesType | null) => {
    dispatch({ type: 'SET_HOVERED_SERIES', payload: seriesId });
  }, []);

  const selectElement = useCallback((element: Element) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  }, []);

  const selectSeries = useCallback((series: SeriesPlaceholder) => {
    dispatch({ type: 'SELECT_SERIES', payload: series });
  }, []);

  const closeDetail = useCallback(() => {
    dispatch({ type: 'CLOSE_DETAIL' });
  }, []);

  const closeSeriesDetail = useCallback(() => {
    dispatch({ type: 'CLOSE_SERIES_DETAIL' });
  }, []);

  return {
    state,
    actions: {
      toggleActiveCategory,
      setHoveredCategory,
      toggleActiveThreatLevel,
      setHoveredThreatLevel,
      setHoveredElement,
      setHoveredSeries,
      selectElement,
      selectSeries,
      closeDetail,
      closeSeriesDetail,
    },
  };
}
