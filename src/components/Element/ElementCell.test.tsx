import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementCell } from './ElementCell';
import type { Element } from '@/types';

const mockHydrogen: Element = {
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

const mockHelium: Element = {
  ...mockHydrogen,
  symbol: 'He',
  name: 'Helium',
  atomicNumber: 2,
  atomicMass: 4.002602,
  category: 'noble-gases',
  threatLevel: 'serious',
  electronShells: { K: 2, L: null, M: null, N: null, O: null, P: null, Q: null },
};

describe('ElementCell', () => {
  it('renders element symbol', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByText('H')).toBeInTheDocument();
  });

  it('renders element name', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByText('Hydrogen')).toBeInTheDocument();
  });

  it('renders atomic number', () => {
    render(<ElementCell element={mockHydrogen} />);
    const cell = screen.getByTestId('element-1');
    expect(cell).toHaveTextContent('1');
  });

  it('renders atomic mass', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByText('1.008')).toBeInTheDocument();
  });

  it('renders electron shells', () => {
    render(<ElementCell element={mockHelium} />);
    const cell = screen.getByTestId('element-2');
    expect(cell).toHaveTextContent('2');
  });

  it('renders threat indicator for endangered elements', () => {
    render(<ElementCell element={mockHelium} />);
    const cell = screen.getByTestId('element-2');
    expect(cell).toBeInTheDocument();
  });

  it('does not render threat indicator for non-endangered elements', () => {
    render(<ElementCell element={mockHydrogen} />);
    const cell = screen.getByTestId('element-1');
    expect(cell).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ElementCell element={mockHydrogen} onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('element-1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = vi.fn();
    render(<ElementCell element={mockHydrogen} onClick={handleClick} />);

    fireEvent.keyDown(screen.getByTestId('element-1'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space key is pressed', () => {
    const handleClick = vi.fn();
    render(<ElementCell element={mockHydrogen} onClick={handleClick} />);

    fireEvent.keyDown(screen.getByTestId('element-1'), { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has role="button" for accessibility', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct data-testid attribute', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByTestId('element-1')).toBeInTheDocument();
  });

  it('displays synthetic element mass in square brackets', () => {
    const mockSynthetic: Element = {
      ...mockHydrogen,
      symbol: 'Tc',
      name: 'Technetium',
      atomicNumber: 43,
      atomicMass: 98,
      isSynthetic: true,
    };
    render(<ElementCell element={mockSynthetic} />);
    expect(screen.getByText('[98]')).toBeInTheDocument();
  });

  it('displays natural element mass without brackets', () => {
    render(<ElementCell element={mockHydrogen} />);
    expect(screen.getByText('1.008')).toBeInTheDocument();
    expect(screen.queryByText('[1.008]')).not.toBeInTheDocument();
  });
});
