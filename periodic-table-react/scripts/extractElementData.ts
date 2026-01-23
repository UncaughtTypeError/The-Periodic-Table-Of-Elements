import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExtractedElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  threatLevel: string | null;
  period: number;
  group: number;
  electronShells: {
    K: number | null;
    L: number | null;
    M: number | null;
    N: number | null;
    O: number | null;
    P: number | null;
    Q: number | null;
  };
  summary: Record<string, string | null>;
  detail: {
    description: string[];
    general: Record<string, string | null>;
    physical: Record<string, string | null>;
    history: Record<string, string | null>;
  };
}

// Element file names mapped to their symbols
const ELEMENT_FILES: string[] = [
  'h', 'he', 'li', 'be', 'b', 'c', 'n', 'o', 'f', 'ne',
  'na', 'mg', 'al', 'si', 'p', 's', 'cl', 'ar',
  'k', 'ca', 'sc', 'ti', 'v', 'cr', 'mn', 'fe', 'co', 'ni', 'cu', 'zn', 'ga', 'ge', 'as', 'se', 'br', 'kr',
  'rb', 'sr', 'y', 'zr', 'nb', 'mo', 'tc', 'ru', 'rh', 'pd', 'ag', 'cd', 'in', 'sn', 'sb', 'te', 'i', 'xe',
  'cs', 'ba', 'la', 'ce', 'pr', 'nd', 'pm', 'sm', 'eu', 'gd', 'tb', 'dy', 'ho', 'er', 'tm', 'yb', 'lu',
  'hf', 'ta', 'w', 're', 'os', 'ir', 'pt', 'au', 'hg', 'tl', 'pb', 'bi', 'po', 'at', 'rn',
  'fr', 'ra', 'ac', 'th', 'pa', 'u', 'np', 'pu', 'am', 'cm', 'bk', 'cf', 'es', 'fm', 'md', 'no', 'lr',
  'rf', 'db', 'sg', 'bh', 'hs', 'mt', 'ds', 'rg', 'cn', 'nh', 'fl', 'mc', 'lv', 'ts', 'og'
];

// Standard periodic table layout: [period, group] for each atomic number
const PERIODIC_TABLE_LAYOUT: Record<number, [number, number]> = {
  1: [1, 1], 2: [1, 18],
  3: [2, 1], 4: [2, 2], 5: [2, 13], 6: [2, 14], 7: [2, 15], 8: [2, 16], 9: [2, 17], 10: [2, 18],
  11: [3, 1], 12: [3, 2], 13: [3, 13], 14: [3, 14], 15: [3, 15], 16: [3, 16], 17: [3, 17], 18: [3, 18],
  19: [4, 1], 20: [4, 2], 21: [4, 3], 22: [4, 4], 23: [4, 5], 24: [4, 6], 25: [4, 7], 26: [4, 8],
  27: [4, 9], 28: [4, 10], 29: [4, 11], 30: [4, 12], 31: [4, 13], 32: [4, 14], 33: [4, 15], 34: [4, 16],
  35: [4, 17], 36: [4, 18],
  37: [5, 1], 38: [5, 2], 39: [5, 3], 40: [5, 4], 41: [5, 5], 42: [5, 6], 43: [5, 7], 44: [5, 8],
  45: [5, 9], 46: [5, 10], 47: [5, 11], 48: [5, 12], 49: [5, 13], 50: [5, 14], 51: [5, 15], 52: [5, 16],
  53: [5, 17], 54: [5, 18],
  55: [6, 1], 56: [6, 2],
  // Lanthanides (57-71) are in period 6, shown separately
  57: [6, 3], 58: [6, 3], 59: [6, 3], 60: [6, 3], 61: [6, 3], 62: [6, 3], 63: [6, 3], 64: [6, 3],
  65: [6, 3], 66: [6, 3], 67: [6, 3], 68: [6, 3], 69: [6, 3], 70: [6, 3], 71: [6, 3],
  72: [6, 4], 73: [6, 5], 74: [6, 6], 75: [6, 7], 76: [6, 8], 77: [6, 9], 78: [6, 10], 79: [6, 11],
  80: [6, 12], 81: [6, 13], 82: [6, 14], 83: [6, 15], 84: [6, 16], 85: [6, 17], 86: [6, 18],
  87: [7, 1], 88: [7, 2],
  // Actinides (89-103) are in period 7, shown separately
  89: [7, 3], 90: [7, 3], 91: [7, 3], 92: [7, 3], 93: [7, 3], 94: [7, 3], 95: [7, 3], 96: [7, 3],
  97: [7, 3], 98: [7, 3], 99: [7, 3], 100: [7, 3], 101: [7, 3], 102: [7, 3], 103: [7, 3],
  104: [7, 4], 105: [7, 5], 106: [7, 6], 107: [7, 7], 108: [7, 8], 109: [7, 9], 110: [7, 10], 111: [7, 11],
  112: [7, 12], 113: [7, 13], 114: [7, 14], 115: [7, 15], 116: [7, 16], 117: [7, 17], 118: [7, 18]
};

function extractCategory(className: string): string {
  const categories = [
    'other-nonmetals', 'noble-gases', 'halogens', 'metalloids',
    'alkaline-earth-metals', 'alkali-metals', 'transition-metals',
    'post-transition-metals', 'lanthanoids', 'actinoids'
  ];
  for (const cat of categories) {
    if (className.includes(cat)) return cat;
  }
  return 'other-nonmetals';
}

function extractThreatLevel(wrapperClass: string): string | null {
  if (wrapperClass.includes('threat-serious')) return 'serious';
  if (wrapperClass.includes('threat-rising')) return 'rising';
  if (wrapperClass.includes('threat-limited')) return 'limited';
  return null;
}

function parseListItems(ul: Element): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  const items = ul.querySelectorAll('li');
  items.forEach(li => {
    const text = li.textContent || '';
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1) {
      const key = text.substring(0, colonIndex).trim().toLowerCase().replace(/\s+/g, '_');
      const value = text.substring(colonIndex + 1).trim();
      result[key] = value || null;
    }
  });
  return result;
}

function parseElementFile(filePath: string): ExtractedElement | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(content);
    const doc = dom.window.document;

    // Extract threat level from wrapper
    const wrapper = doc.querySelector('.wrapper');
    const wrapperClass = wrapper?.className || '';
    const threatLevel = extractThreatLevel(wrapperClass);

    // Extract category from element div
    const elementDiv = doc.querySelector('.card.summary .element');
    const category = extractCategory(elementDiv?.className || '');

    // Extract basic info
    const atomicNumber = parseInt(doc.querySelector('.atomic-number')?.textContent?.trim() || '0');
    const symbol = doc.querySelector('.element-symbol strong')?.textContent?.trim() || '';
    const name = doc.querySelector('.element-name')?.textContent?.trim() || '';
    const atomicMass = parseFloat(doc.querySelector('.atomic-mass')?.textContent?.trim() || '0');

    // Extract electron shells
    const shells = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'] as const;
    const electronShells: ExtractedElement['electronShells'] = {
      K: null, L: null, M: null, N: null, O: null, P: null, Q: null
    };
    shells.forEach(shell => {
      const value = doc.querySelector(`.atomic-orbital-shells .${shell}`)?.textContent?.trim();
      electronShells[shell] = value ? parseInt(value) : null;
    });

    // Extract summary list
    const summaryUl = doc.querySelector('.card.summary ul');
    const summary = summaryUl ? parseListItems(summaryUl) : {};

    // Extract description paragraphs
    const descriptionPs = doc.querySelectorAll('.card.description p');
    const description: string[] = [];
    descriptionPs.forEach(p => {
      const text = p.textContent?.trim();
      if (text) description.push(text);
    });

    // Extract overview sections
    const overviewCard = doc.querySelector('.card.overview');
    const general: Record<string, string | null> = {};
    const physical: Record<string, string | null> = {};
    const history: Record<string, string | null> = {};

    if (overviewCard) {
      const strongElements = overviewCard.querySelectorAll('p strong');
      strongElements.forEach(strong => {
        const sectionTitle = strong.textContent?.toLowerCase() || '';
        const ul = strong.parentElement?.nextElementSibling;
        if (ul && ul.tagName === 'UL') {
          const items = parseListItems(ul);
          if (sectionTitle.includes('general')) {
            Object.assign(general, items);
          } else if (sectionTitle.includes('physical')) {
            Object.assign(physical, items);
          } else if (sectionTitle.includes('history')) {
            Object.assign(history, items);
          }
        }
      });
    }

    // Get period and group from layout
    const layout = PERIODIC_TABLE_LAYOUT[atomicNumber] || [1, 1];

    return {
      symbol,
      name,
      atomicNumber,
      atomicMass,
      category,
      threatLevel,
      period: layout[0],
      group: layout[1],
      electronShells,
      summary,
      detail: {
        description,
        general,
        physical,
        history
      }
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

function generateTypeScriptOutput(elements: ExtractedElement[]): string {
  const imports = `import { Element, ElementCategory, ThreatLevel } from '../types';

`;

  const elementsArray = elements.map(el => {
    return `  {
    symbol: '${el.symbol}',
    name: '${el.name}',
    atomicNumber: ${el.atomicNumber},
    atomicMass: ${el.atomicMass},
    category: '${el.category}' as ElementCategory,
    threatLevel: ${el.threatLevel ? `'${el.threatLevel}'` : 'null'} as ThreatLevel,
    period: ${el.period},
    group: ${el.group},
    electronShells: {
      K: ${el.electronShells.K},
      L: ${el.electronShells.L},
      M: ${el.electronShells.M},
      N: ${el.electronShells.N},
      O: ${el.electronShells.O},
      P: ${el.electronShells.P},
      Q: ${el.electronShells.Q}
    },
    summary: {
      atomicMass: ${JSON.stringify(el.summary.atomic_mass || el.atomicMass.toString())},
      boilingPoint: ${JSON.stringify(el.summary.boiling_point || null)},
      electronConfiguration: ${JSON.stringify(el.summary.electron_configuration || '')},
      electronegativity: ${JSON.stringify(el.summary.electronegativity || null)},
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
      discovered: ${JSON.stringify(el.summary.discovered || null)},
      discoverer: ${JSON.stringify(el.summary.discoverer || el.summary.discoverers || null)}
    },
    detail: {
      description: ${JSON.stringify(el.detail.description)},
      general: {
        appearance: ${JSON.stringify(el.detail.general.appearance || null)},
        group: ${JSON.stringify(el.detail.general.group || null)},
        block: ${JSON.stringify(el.detail.general.block || null)},
        period: ${JSON.stringify(el.detail.general.period || null)},
        elementCategory: ${JSON.stringify(el.detail.general.element_category || null)},
        electronConfiguration: ${JSON.stringify(el.detail.general.electron_configuration || null)},
        perShell: ${JSON.stringify(el.detail.general.per_shell || null)}
      },
      physical: {
        color: ${JSON.stringify(el.detail.physical.color || null)},
        phase: ${JSON.stringify(el.detail.physical.phase || null)},
        meltingPoint: ${JSON.stringify(el.detail.physical.melting_point || null)},
        boilingPoint: ${JSON.stringify(el.detail.physical.boiling_point || null)},
        density: ${JSON.stringify(el.detail.physical.density || null)}
      },
      history: {
        discovery: ${JSON.stringify(el.detail.history.discovery || null)},
        namedBy: ${JSON.stringify(el.detail.history.named_by || null)},
        naming: ${JSON.stringify(el.detail.history.naming || null)},
        firstIsolation: ${JSON.stringify(el.detail.history.first_isolation || null)}
      }
    }
  }`;
  }).join(',\n');

  return imports + `export const elements: Element[] = [\n${elementsArray}\n];\n`;
}

// Main execution
const projectRoot = path.resolve(__dirname, '../..');
const outputPath = path.resolve(__dirname, '../src/data/elements.ts');

console.log('Extracting element data from PHP files...');
console.log(`Project root: ${projectRoot}`);

const elements: ExtractedElement[] = [];

for (const symbol of ELEMENT_FILES) {
  const filePath = path.join(projectRoot, `${symbol}.php`);
  if (fs.existsSync(filePath)) {
    const element = parseElementFile(filePath);
    if (element) {
      elements.push(element);
      console.log(`✓ Extracted: ${element.name} (${element.symbol})`);
    }
  } else {
    console.warn(`✗ File not found: ${filePath}`);
  }
}

// Sort by atomic number
elements.sort((a, b) => a.atomicNumber - b.atomicNumber);

console.log(`\nTotal elements extracted: ${elements.length}`);

// Generate output
const output = generateTypeScriptOutput(elements);
fs.writeFileSync(outputPath, output);
console.log(`\nOutput written to: ${outputPath}`);
