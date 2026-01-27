/**
 * Script to fix element category assignments
 * Run with: npx tsx scripts/fixCategories.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Correct category assignments based on standard periodic table classification
// Source: IUPAC and standard periodic table classifications
const categoryCorrections: Record<string, string> = {
  // Other nonmetals (7)
  'H': 'other-nonmetals',
  'C': 'other-nonmetals',
  'N': 'other-nonmetals',
  'O': 'other-nonmetals',
  'P': 'other-nonmetals',
  'S': 'other-nonmetals',
  'Se': 'other-nonmetals',

  // Noble gases (7)
  'He': 'noble-gases',
  'Ne': 'noble-gases',
  'Ar': 'noble-gases',
  'Kr': 'noble-gases',
  'Xe': 'noble-gases',
  'Rn': 'noble-gases',
  'Og': 'noble-gases', // Oganesson - predicted to be a noble gas

  // Halogens (6) - F, Cl, Br, I, At, Ts
  'F': 'halogens',
  'Cl': 'halogens',
  'Br': 'halogens',
  'I': 'halogens',
  'At': 'halogens',
  'Ts': 'halogens',

  // Alkali metals (6)
  'Li': 'alkali-metals',
  'Na': 'alkali-metals',
  'K': 'alkali-metals',
  'Rb': 'alkali-metals',
  'Cs': 'alkali-metals',
  'Fr': 'alkali-metals',

  // Alkaline earth metals (6)
  'Be': 'alkaline-earth-metals',
  'Mg': 'alkaline-earth-metals',
  'Ca': 'alkaline-earth-metals',
  'Sr': 'alkaline-earth-metals',
  'Ba': 'alkaline-earth-metals',
  'Ra': 'alkaline-earth-metals',

  // Metalloids (6)
  'B': 'metalloids',
  'Si': 'metalloids',
  'Ge': 'metalloids',
  'As': 'metalloids',
  'Sb': 'metalloids',
  'Te': 'metalloids',

  // Post-transition metals (10)
  'Al': 'post-transition-metals',
  'Ga': 'post-transition-metals',
  'In': 'post-transition-metals',
  'Sn': 'post-transition-metals',
  'Tl': 'post-transition-metals',
  'Pb': 'post-transition-metals',
  'Bi': 'post-transition-metals',
  'Po': 'post-transition-metals',
  'Nh': 'post-transition-metals', // Nihonium
  'Fl': 'post-transition-metals', // Flerovium
  'Mc': 'post-transition-metals', // Moscovium
  'Lv': 'post-transition-metals', // Livermorium

  // Lanthanoids (15)
  'La': 'lanthanoids',
  'Ce': 'lanthanoids',
  'Pr': 'lanthanoids',
  'Nd': 'lanthanoids',
  'Pm': 'lanthanoids',
  'Sm': 'lanthanoids',
  'Eu': 'lanthanoids',
  'Gd': 'lanthanoids',
  'Tb': 'lanthanoids',
  'Dy': 'lanthanoids',
  'Ho': 'lanthanoids',
  'Er': 'lanthanoids',
  'Tm': 'lanthanoids',
  'Yb': 'lanthanoids',
  'Lu': 'lanthanoids',

  // Actinoids (15)
  'Ac': 'actinoids',
  'Th': 'actinoids',
  'Pa': 'actinoids',
  'U': 'actinoids',
  'Np': 'actinoids',
  'Pu': 'actinoids',
  'Am': 'actinoids',
  'Cm': 'actinoids',
  'Bk': 'actinoids',
  'Cf': 'actinoids',
  'Es': 'actinoids',
  'Fm': 'actinoids',
  'Md': 'actinoids',
  'No': 'actinoids',
  'Lr': 'actinoids',

  // Transition metals (remaining elements in d-block)
  'Sc': 'transition-metals',
  'Ti': 'transition-metals',
  'V': 'transition-metals',
  'Cr': 'transition-metals',
  'Mn': 'transition-metals',
  'Fe': 'transition-metals',
  'Co': 'transition-metals',
  'Ni': 'transition-metals',
  'Cu': 'transition-metals',
  'Zn': 'transition-metals',
  'Y': 'transition-metals',
  'Zr': 'transition-metals',
  'Nb': 'transition-metals',
  'Mo': 'transition-metals',
  'Tc': 'transition-metals',
  'Ru': 'transition-metals',
  'Rh': 'transition-metals',
  'Pd': 'transition-metals',
  'Ag': 'transition-metals',
  'Cd': 'transition-metals',
  'Hf': 'transition-metals',
  'Ta': 'transition-metals',
  'W': 'transition-metals',
  'Re': 'transition-metals',
  'Os': 'transition-metals',
  'Ir': 'transition-metals',
  'Pt': 'transition-metals',
  'Au': 'transition-metals',
  'Hg': 'transition-metals',
  'Rf': 'transition-metals',
  'Db': 'transition-metals',
  'Sg': 'transition-metals',
  'Bh': 'transition-metals',
  'Hs': 'transition-metals',
  'Mt': 'transition-metals',
  'Ds': 'transition-metals',
  'Rg': 'transition-metals',
  'Cn': 'transition-metals',
};

const elementsFilePath = join(__dirname, '../src/data/elements.ts');

let content = readFileSync(elementsFilePath, 'utf-8');

// For each element, update its category
for (const [symbol, category] of Object.entries(categoryCorrections)) {
  // Match pattern: symbol: 'XX',\n    name: '...',\n    atomicNumber: N,\n    atomicMass: N,\n    isSynthetic: ...,\n    category: '...'
  const pattern = new RegExp(
    `(symbol: '${symbol}',\\s+name: '[^']+',\\s+atomicNumber: \\d+,\\s+atomicMass: [\\d.]+,\\s+isSynthetic: (?:true|false),\\s+)category: '[^']+' as ElementCategory`,
    'g'
  );
  content = content.replace(pattern, `$1category: '${category}' as ElementCategory`);
}

writeFileSync(elementsFilePath, content, 'utf-8');

console.log('Successfully updated element categories!');

// Verify counts
const categoryCounts: Record<string, number> = {};
for (const category of Object.values(categoryCorrections)) {
  categoryCounts[category] = (categoryCounts[category] || 0) + 1;
}
console.log('\nCategory counts:');
for (const [cat, count] of Object.entries(categoryCounts).sort()) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`  Total: ${Object.keys(categoryCorrections).length}`);
