# <img src="public/favicon.svg" width="32" height="32" alt="Logo" /> The Periodic Table of Elements

An interactive periodic table application built with React and TypeScript. Browse all 118 elements with detailed properties, pronunciation guides, filtering by category, electron block, threat level, and more.

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c636c1d-8a67-42ae-b424-7bf16d9592e0/deploy-status)](https://app.netlify.com/projects/periodic-table-of-chemical-elements/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Interactive Element Grid**: Click any element to view detailed information including physical properties, electron configuration, history, and discovery
- **Pronunciation Guides**: IPA transcription and simplified respelling for every element, with text-to-speech playback via the Web Speech API
- **Formatted Electron Configurations**: Superscript notation for subshell electron counts (e.g. 3d&#x2076; 4s&#xB2;)
- **Category Filtering**: Filter elements by 10 categories (alkali metals, noble gases, transition metals, etc.)
- **Electron Block Filtering**: Filter by s-block, p-block, d-block, or f-block
- **State of Matter Indicators**: Visual icons showing solid, liquid, or gas standard state for each element
- **Natural Occurrence Indicators**: Icons distinguishing primordial, from-decay, and synthetic elements
- **Radioactivity Indicators**: Clear visual markers for radioactive elements
- **Threat Level Indicators**: Visual indicators for elements with limited availability, rising threats, or serious supply concerns
- **Lanthanoid & Actinoid Series**: Dedicated detail panels with mini periodic table visualization highlighting the series in context
- **Endangered Element Badges**: Warning badges with severity dots for elements facing supply threats
- **Synthetic Element Display**: Synthetic elements display atomic mass in [brackets] to indicate no stable isotopes
- **Legend with Interactive Filters**: Clickable legend items that double as filters for state of matter and radioactivity
- **Responsive Design**: Works on desktop, tablet, and mobile devices with adaptive cell sizing
- **Accessible**: Keyboard navigation, ARIA attributes, tooltips, and screen reader support

## Tech Stack

- **React 19** - UI framework
- **TypeScript 5** - Type-safe JavaScript
- **Vite 7** - Build tool and dev server
- **CSS Modules** - Scoped component styling
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or the next available port).

### Build

```bash
npm run build
```

Outputs production build to `dist/`

### Testing

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Linting

```bash
npm run lint
```

## Element Categories

| Category               | Count | Examples                   |
| ---------------------- | ----- | -------------------------- |
| Transition Metals      | 38    | Fe, Cu, Au, Ag             |
| Lanthanoids            | 15    | La, Ce, Nd, Eu             |
| Actinoids              | 15    | Ac, U, Pu, Am              |
| Post-Transition Metals | 11    | Al, Sn, Pb, Bi             |
| Metalloids             | 8     | B, Si, Ge, As, Po, Ts      |
| Noble Gases            | 7     | He, Ne, Ar, Kr, Xe, Rn, Og |
| Other Nonmetals        | 7     | H, C, N, O, P, S, Se       |
| Alkali Metals          | 6     | Li, Na, K, Rb, Cs, Fr      |
| Alkaline Earth Metals  | 6     | Be, Mg, Ca, Sr, Ba, Ra     |
| Halogens               | 5     | F, Cl, Br, I, At           |

## Contributing

Contributions are welcome! If you spot an error in element data, pronunciation, or have a feature suggestion:

1. **Open an issue** on [GitHub Issues](https://github.com/UncaughtTypeError/The-Periodic-Table-Of-Elements/issues) describing the correction or suggestion
2. **Fork the repo** and submit a pull request for code changes
3. For data corrections (pronunciation, element properties, history), please include a reference source

### Running Checks Before Submitting

```bash
npm run lint
npm run test:run
npm run build
```

## Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/UncaughtTypeError/The-Periodic-Table-Of-Elements/issues)
- **Repository**: [github.com/UncaughtTypeError/The-Periodic-Table-Of-Elements](https://github.com/UncaughtTypeError/The-Periodic-Table-Of-Elements)

## License

MIT
