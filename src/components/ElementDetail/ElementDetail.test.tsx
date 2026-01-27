import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementDetail } from './ElementDetail';
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
    description: ['Hydrogen is a chemical element with chemical symbol H and atomic number 1.'],
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
  detail: {
    ...mockHydrogen.detail,
    description: ['Helium is a chemical element with symbol He and atomic number 2.'],
  },
};

describe('ElementDetail', () => {
  it('renders null when element is null', () => {
    const { container } = render(
      <ElementDetail element={null} isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders element symbol when open', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    // Multiple H's appear (in symbol display, summary list, etc.)
    const symbols = screen.getAllByText('H');
    expect(symbols.length).toBeGreaterThan(0);
  });

  it('renders element name when open', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    // Element name appears multiple times
    const names = screen.getAllByText(/Hydrogen/);
    expect(names.length).toBeGreaterThan(0);
  });

  it('renders atomic number when open', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    const panel = screen.getByTestId('detail-panel');
    expect(panel).toHaveTextContent('1');
  });

  it('renders description text', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(
      screen.getByText('Hydrogen is a chemical element with chemical symbol H and atomic number 1.')
    ).toBeInTheDocument();
  });

  it('renders general properties section', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('General properties')).toBeInTheDocument();
    expect(screen.getByText(/colorless gas/)).toBeInTheDocument();
  });

  it('renders physical properties section', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Physical properties')).toBeInTheDocument();
    // Check for phase value
    const panel = screen.getByTestId('detail-panel');
    expect(panel).toHaveTextContent('Phase:');
    expect(panel).toHaveTextContent('gas');
  });

  it('renders history section', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('History')).toBeInTheDocument();
    // Check history content exists
    const panel = screen.getByTestId('detail-panel');
    expect(panel).toHaveTextContent('Discovery:');
  });

  it('renders endangered badge for threatened elements', () => {
    render(<ElementDetail element={mockHelium} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Serious Threat/)).toBeInTheDocument();
  });

  it('does not render endangered badge for non-threatened elements', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.queryByText(/Serious Threat/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rising Threat/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Limited Availability/)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has correct data-testid attribute', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByTestId('detail-panel')).toBeInTheDocument();
  });

  it('has dialog role for accessibility', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={onClose} />);

    // Click on the overlay (backdrop)
    fireEvent.click(screen.getByTestId('detail-panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies open class when isOpen is true', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={true} onClose={vi.fn()} />);
    const overlay = screen.getByTestId('detail-panel');
    expect(overlay.className).toContain('open');
  });

  it('does not apply open class when isOpen is false', () => {
    render(<ElementDetail element={mockHydrogen} isOpen={false} onClose={vi.fn()} />);
    const overlay = screen.getByTestId('detail-panel');
    expect(overlay.className).not.toContain('open');
  });
});
