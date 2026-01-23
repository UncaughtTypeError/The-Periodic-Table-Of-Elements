// Defines the standard periodic table layout
// Each period has 18 columns (groups)
// Lanthanides and Actinides are displayed separately below the main table

export interface TablePosition {
  period: number;
  group: number;
  isLanthanide?: boolean;
  isActinide?: boolean;
}

// Maps atomic number to table position
export const TABLE_POSITIONS: Record<number, TablePosition> = {
  // Period 1
  1: { period: 1, group: 1 },
  2: { period: 1, group: 18 },

  // Period 2
  3: { period: 2, group: 1 },
  4: { period: 2, group: 2 },
  5: { period: 2, group: 13 },
  6: { period: 2, group: 14 },
  7: { period: 2, group: 15 },
  8: { period: 2, group: 16 },
  9: { period: 2, group: 17 },
  10: { period: 2, group: 18 },

  // Period 3
  11: { period: 3, group: 1 },
  12: { period: 3, group: 2 },
  13: { period: 3, group: 13 },
  14: { period: 3, group: 14 },
  15: { period: 3, group: 15 },
  16: { period: 3, group: 16 },
  17: { period: 3, group: 17 },
  18: { period: 3, group: 18 },

  // Period 4
  19: { period: 4, group: 1 },
  20: { period: 4, group: 2 },
  21: { period: 4, group: 3 },
  22: { period: 4, group: 4 },
  23: { period: 4, group: 5 },
  24: { period: 4, group: 6 },
  25: { period: 4, group: 7 },
  26: { period: 4, group: 8 },
  27: { period: 4, group: 9 },
  28: { period: 4, group: 10 },
  29: { period: 4, group: 11 },
  30: { period: 4, group: 12 },
  31: { period: 4, group: 13 },
  32: { period: 4, group: 14 },
  33: { period: 4, group: 15 },
  34: { period: 4, group: 16 },
  35: { period: 4, group: 17 },
  36: { period: 4, group: 18 },

  // Period 5
  37: { period: 5, group: 1 },
  38: { period: 5, group: 2 },
  39: { period: 5, group: 3 },
  40: { period: 5, group: 4 },
  41: { period: 5, group: 5 },
  42: { period: 5, group: 6 },
  43: { period: 5, group: 7 },
  44: { period: 5, group: 8 },
  45: { period: 5, group: 9 },
  46: { period: 5, group: 10 },
  47: { period: 5, group: 11 },
  48: { period: 5, group: 12 },
  49: { period: 5, group: 13 },
  50: { period: 5, group: 14 },
  51: { period: 5, group: 15 },
  52: { period: 5, group: 16 },
  53: { period: 5, group: 17 },
  54: { period: 5, group: 18 },

  // Period 6
  55: { period: 6, group: 1 },
  56: { period: 6, group: 2 },
  // Lanthanides (57-71) shown separately
  57: { period: 6, group: 3, isLanthanide: true },
  58: { period: 6, group: 4, isLanthanide: true },
  59: { period: 6, group: 5, isLanthanide: true },
  60: { period: 6, group: 6, isLanthanide: true },
  61: { period: 6, group: 7, isLanthanide: true },
  62: { period: 6, group: 8, isLanthanide: true },
  63: { period: 6, group: 9, isLanthanide: true },
  64: { period: 6, group: 10, isLanthanide: true },
  65: { period: 6, group: 11, isLanthanide: true },
  66: { period: 6, group: 12, isLanthanide: true },
  67: { period: 6, group: 13, isLanthanide: true },
  68: { period: 6, group: 14, isLanthanide: true },
  69: { period: 6, group: 15, isLanthanide: true },
  70: { period: 6, group: 16, isLanthanide: true },
  71: { period: 6, group: 17, isLanthanide: true },
  72: { period: 6, group: 4 },
  73: { period: 6, group: 5 },
  74: { period: 6, group: 6 },
  75: { period: 6, group: 7 },
  76: { period: 6, group: 8 },
  77: { period: 6, group: 9 },
  78: { period: 6, group: 10 },
  79: { period: 6, group: 11 },
  80: { period: 6, group: 12 },
  81: { period: 6, group: 13 },
  82: { period: 6, group: 14 },
  83: { period: 6, group: 15 },
  84: { period: 6, group: 16 },
  85: { period: 6, group: 17 },
  86: { period: 6, group: 18 },

  // Period 7
  87: { period: 7, group: 1 },
  88: { period: 7, group: 2 },
  // Actinides (89-103) shown separately
  89: { period: 7, group: 3, isActinide: true },
  90: { period: 7, group: 4, isActinide: true },
  91: { period: 7, group: 5, isActinide: true },
  92: { period: 7, group: 6, isActinide: true },
  93: { period: 7, group: 7, isActinide: true },
  94: { period: 7, group: 8, isActinide: true },
  95: { period: 7, group: 9, isActinide: true },
  96: { period: 7, group: 10, isActinide: true },
  97: { period: 7, group: 11, isActinide: true },
  98: { period: 7, group: 12, isActinide: true },
  99: { period: 7, group: 13, isActinide: true },
  100: { period: 7, group: 14, isActinide: true },
  101: { period: 7, group: 15, isActinide: true },
  102: { period: 7, group: 16, isActinide: true },
  103: { period: 7, group: 17, isActinide: true },
  104: { period: 7, group: 4 },
  105: { period: 7, group: 5 },
  106: { period: 7, group: 6 },
  107: { period: 7, group: 7 },
  108: { period: 7, group: 8 },
  109: { period: 7, group: 9 },
  110: { period: 7, group: 10 },
  111: { period: 7, group: 11 },
  112: { period: 7, group: 12 },
  113: { period: 7, group: 13 },
  114: { period: 7, group: 14 },
  115: { period: 7, group: 15 },
  116: { period: 7, group: 16 },
  117: { period: 7, group: 17 },
  118: { period: 7, group: 18 },
};

// Get elements for a specific period (main table row)
export function getElementsForPeriod(period: number, elements: { atomicNumber: number }[]): (number | null)[] {
  const row: (number | null)[] = new Array(18).fill(null);

  for (const element of elements) {
    const pos = TABLE_POSITIONS[element.atomicNumber];
    if (pos && pos.period === period && !pos.isLanthanide && !pos.isActinide) {
      row[pos.group - 1] = element.atomicNumber;
    }
  }

  return row;
}

// Get lanthanide elements (atomic numbers 57-71)
export function getLanthanides(elements: { atomicNumber: number }[]): number[] {
  return elements
    .filter(e => e.atomicNumber >= 57 && e.atomicNumber <= 71)
    .map(e => e.atomicNumber)
    .sort((a, b) => a - b);
}

// Get actinide elements (atomic numbers 89-103)
export function getActinides(elements: { atomicNumber: number }[]): number[] {
  return elements
    .filter(e => e.atomicNumber >= 89 && e.atomicNumber <= 103)
    .map(e => e.atomicNumber)
    .sort((a, b) => a - b);
}
