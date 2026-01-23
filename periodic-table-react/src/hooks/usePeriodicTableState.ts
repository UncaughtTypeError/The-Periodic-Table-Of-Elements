import { useReducer, useCallback } from 'react';
import type { Element, ElementCategory, ThreatLevel } from '../types';

interface State {
  activeCategory: ElementCategory | null;
  hoveredCategory: ElementCategory | null;
  activeThreatLevel: ThreatLevel;
  hoveredThreatLevel: ThreatLevel;
  selectedElement: Element | null;
  isDetailOpen: boolean;
}

type Action =
  | { type: 'SET_ACTIVE_CATEGORY'; payload: ElementCategory | null }
  | { type: 'SET_HOVERED_CATEGORY'; payload: ElementCategory | null }
  | { type: 'SET_ACTIVE_THREAT'; payload: ThreatLevel }
  | { type: 'SET_HOVERED_THREAT'; payload: ThreatLevel }
  | { type: 'SELECT_ELEMENT'; payload: Element }
  | { type: 'CLOSE_DETAIL' };

const initialState: State = {
  activeCategory: null,
  hoveredCategory: null,
  activeThreatLevel: null,
  hoveredThreatLevel: null,
  selectedElement: null,
  isDetailOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: state.activeCategory === action.payload ? null : action.payload,
      };

    case 'SET_HOVERED_CATEGORY':
      return {
        ...state,
        hoveredCategory: action.payload,
      };

    case 'SET_ACTIVE_THREAT':
      return {
        ...state,
        activeThreatLevel: state.activeThreatLevel === action.payload ? null : action.payload,
      };

    case 'SET_HOVERED_THREAT':
      return {
        ...state,
        hoveredThreatLevel: action.payload,
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

    default:
      return state;
  }
}

export function usePeriodicTableState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setActiveCategory = useCallback((category: ElementCategory | null) => {
    dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: category });
  }, []);

  const setHoveredCategory = useCallback((category: ElementCategory | null) => {
    dispatch({ type: 'SET_HOVERED_CATEGORY', payload: category });
  }, []);

  const setActiveThreatLevel = useCallback((threat: ThreatLevel) => {
    dispatch({ type: 'SET_ACTIVE_THREAT', payload: threat });
  }, []);

  const setHoveredThreatLevel = useCallback((threat: ThreatLevel) => {
    dispatch({ type: 'SET_HOVERED_THREAT', payload: threat });
  }, []);

  const selectElement = useCallback((element: Element) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  }, []);

  const closeDetail = useCallback(() => {
    dispatch({ type: 'CLOSE_DETAIL' });
  }, []);

  return {
    state,
    actions: {
      setActiveCategory,
      setHoveredCategory,
      setActiveThreatLevel,
      setHoveredThreatLevel,
      selectElement,
      closeDetail,
    },
  };
}
