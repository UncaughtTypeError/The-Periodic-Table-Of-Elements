/**
 * Script to fix synthetic element atomic masses and add isSynthetic flag
 * Run with: npx tsx scripts/fixSyntheticElements.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Synthetic elements with their correct atomic masses (most stable isotope)
const syntheticElements: Record<string, number> = {
  'Tc': 98,    // Technetium
  'Pm': 145,   // Promethium
  'Po': 209,   // Polonium
  'At': 210,   // Astatine
  'Rn': 222,   // Radon
  'Fr': 223,   // Francium
  'Ra': 226,   // Radium
  'Ac': 227,   // Actinium
  'Np': 237,   // Neptunium
  'Pu': 244,   // Plutonium
  'Am': 243,   // Americium
  'Cm': 247,   // Curium
  'Bk': 247,   // Berkelium
  'Cf': 251,   // Californium
  'Es': 252,   // Einsteinium
  'Fm': 257,   // Fermium
  'Md': 258,   // Mendelevium
  'No': 259,   // Nobelium
  'Lr': 262,   // Lawrencium
  'Rf': 261,   // Rutherfordium
  'Db': 262,   // Dubnium
  'Sg': 266,   // Seaborgium
  'Bh': 264,   // Bohrium
  'Hs': 277,   // Hassium
  'Mt': 268,   // Meitnerium
  'Ds': 281,   // Darmstadtium
  'Rg': 280,   // Roentgenium
  'Cn': 285,   // Copernicium
  'Nh': 284,   // Nihonium
  'Fl': 289,   // Flerovium
  'Mc': 288,   // Moscovium
  'Lv': 293,   // Livermorium
  'Ts': 294,   // Tennessine
  'Og': 294,   // Oganesson
};

const elementsFilePath = join(__dirname, '../src/data/elements.ts');

let content = readFileSync(elementsFilePath, 'utf-8');

// For each element entry, add isSynthetic flag after atomicMass
// Pattern: atomicMass: <number>,\n    category:
// Replace with: atomicMass: <number>,\n    isSynthetic: <true/false>,\n    category:

// First, handle synthetic elements - fix NaN and add isSynthetic: true
for (const [symbol, mass] of Object.entries(syntheticElements)) {
  // Replace NaN atomicMass with correct value and add isSynthetic: true
  const nanPattern = new RegExp(
    `(symbol: '${symbol}',\\s+name: '[^']+',\\s+atomicNumber: \\d+,\\s+)atomicMass: NaN,`,
    'g'
  );
  content = content.replace(nanPattern, `$1atomicMass: ${mass},\n    isSynthetic: true,`);

  // Also handle cases where atomicMass might already have a value
  const valuePattern = new RegExp(
    `(symbol: '${symbol}',\\s+name: '[^']+',\\s+atomicNumber: \\d+,\\s+atomicMass: )[\\d.]+,\\s+category:`,
    'g'
  );
  content = content.replace(valuePattern, `$1${mass},\n    isSynthetic: true,\n    category:`);
}

// For all remaining elements (non-synthetic), add isSynthetic: false
// Match: atomicMass: <number>,\n    category: (without isSynthetic already there)
const nonSyntheticPattern = /atomicMass: ([\d.]+),\n    category:/g;
content = content.replace(nonSyntheticPattern, 'atomicMass: $1,\n    isSynthetic: false,\n    category:');

writeFileSync(elementsFilePath, content, 'utf-8');

console.log('Successfully updated elements.ts with isSynthetic flag and fixed atomic masses!');
console.log(`Updated ${Object.keys(syntheticElements).length} synthetic elements.`);
