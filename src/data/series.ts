import type { SeriesPlaceholder } from '../types';

export const seriesPlaceholders: SeriesPlaceholder[] = [
  {
    id: 'lanthanoids',
    symbol: 'Ln',
    name: 'Lanthanoids',
    atomicNumberRange: '57 - 71',
    category: 'lanthanoids',
    period: 6,
    group: 3,
    description: [
      'The lanthanide /\u02C8l\u00E6n\u03B8\u0259na\u026Ad/ or lanthanoid /\u02C8l\u00E6n\u03B8\u0259n\u0254\u026Ad/ series of chemical elements comprises the fifteen metallic chemical elements with atomic numbers 57 through 71, from lanthanum through lutetium. These fifteen lanthanide elements, along with the chemically similar elements scandium and yttrium, are often collectively known as the rare earth elements.',
      'The informal chemical symbol Ln is used in general discussions of lanthanide chemistry to refer to any lanthanide. All but one of the lanthanides are f-block elements, corresponding to the filling of the 4f electron shell; lutetium, a d-block element, is also generally considered to be a lanthanide due to its chemical similarities with the other fourteen. All lanthanide elements form trivalent cations, Ln3+, whose chemistry is largely determined by the ionic radius, which decreases steadily from lanthanum to lutetium.',
      'They are termed lanthanides because the lighter elements in the series are chemically similar to lanthanum. Strictly speaking, both lanthanum and lutetium have been labeled as group 3 elements, because they both have a single valence electron in the 5d shell. However, both elements are often included in any general discussion of the chemistry of the lanthanide elements.',
      'Lanthanum is the more often omitted of the two, because its placement as a group 3 element is somewhat more common in texts and for semantic reasons: since "lanthanide" means "like lanthanum", it has been argued that lanthanum cannot logically be a lanthanide, even though IUPAC acknowledges its inclusion based on common usage.',
      'In presentations of the periodic table, the lanthanides and the actinides are customarily shown as two additional rows below the main body of the table, with placeholders or else a selected single element of each series (either lanthanum and actinium, or lutetium and lawrencium) shown in a single cell of the main table, between barium and hafnium, and radium and rutherfordium, respectively. This convention is entirely a matter of aesthetics and formatting practicality; a rarely used wide-formatted periodic table inserts the lanthanide and actinide series in their proper places, as parts of the table\'s sixth and seventh rows (periods).',
    ],
    elementNumbers: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
  },
  {
    id: 'actinoids',
    symbol: 'An',
    name: 'Actinoids',
    atomicNumberRange: '89 - 103',
    category: 'actinoids',
    period: 7,
    group: 3,
    description: [
      'The actinide /\u02C8\u00E6kt\u1D7Bna\u026Ad/ or actinoid /\u02C8\u00E6kt\u1D7Bn\u0254\u026Ad/ (IUPAC nomenclature) series encompasses the 15 metallic chemical elements with atomic numbers from 89 to 103, actinium through lawrencium. The actinide series derives its name from the first element in the series, actinium. The informal chemical symbol An is used in general discussions of actinide chemistry to refer to any actinide.',
      'All but one of the actinides are f-block elements, corresponding to the filling of the 5f electron shell; lawrencium, a d-block element, is also generally considered an actinide. In comparison with the lanthanides, also mostly f-block elements, the actinides show much more variable valence.',
      'They all have very large atomic and ionic radii and exhibit an unusually large range of physical properties. While actinium and the late actinides (from americium onwards) behave similarly to the lanthanides, the elements thorium through neptunium are much more similar to transition metals in their chemistry.',
      'All actinides are radioactive and release energy upon radioactive decay; naturally occurring uranium and thorium, and synthetically produced plutonium are the most abundant actinides on Earth. These are used in nuclear reactors and nuclear weapons. Uranium and thorium also have diverse current or historical uses, and americium is used in the ionization chambers of most modern smoke detectors. Of the actinides, primordial thorium and uranium occur naturally in substantial quantities.',
      'The radioactive decay of uranium produces transient amounts of actinium and protactinium, and atoms of neptunium and plutonium are occasionally produced from transmutation reactions in uranium ores.',
      'The other actinides are purely synthetic elements. Nuclear weapons tests have released at least six actinides heavier than plutonium into the environment; analysis of debris from a 1952 hydrogen bomb explosion showed the presence of americium, curium, berkelium, californium, einsteinium and fermium.',
      'In presentations of the periodic table, the lanthanides and the actinides are customarily shown as two additional rows below the main body of the table, with placeholders or else a selected single element of each series (either lanthanum or lutetium, and either actinium or lawrencium, respectively) shown in a single cell of the main table, between barium and hafnium, and radium and rutherfordium, respectively. This convention is entirely a matter of aesthetics and formatting practicality; a rarely used wide-formatted periodic table inserts the lanthanide and actinide series in their proper places, as parts of the table\'s sixth and seventh rows (periods).',
    ],
    elementNumbers: [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
  },
];

export function getSeriesByType(type: 'lanthanoids' | 'actinoids'): SeriesPlaceholder {
  return seriesPlaceholders.find(s => s.id === type)!;
}
