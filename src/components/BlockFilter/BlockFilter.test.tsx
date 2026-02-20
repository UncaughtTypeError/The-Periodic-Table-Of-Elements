import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlockFilter } from './BlockFilter';
import type { ElectronBlock } from '@/types';

describe('BlockFilter', () => {
  const defaultProps = {
    activeBlockFilters: new Set<ElectronBlock>(),
    blockCounts: new Map<ElectronBlock, number>(),
    onBlockClick: vi.fn(),
    onBlockHover: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders electron blocks title', () => {
    render(<BlockFilter {...defaultProps} />);
    expect(screen.getByText('Electron Blocks')).toBeInTheDocument();
  });

  it('renders all 4 block buttons', () => {
    render(<BlockFilter {...defaultProps} />);

    expect(screen.getByText(/S-Block/)).toBeInTheDocument();
    expect(screen.getByText(/P-Block/)).toBeInTheDocument();
    expect(screen.getByText(/D-Block/)).toBeInTheDocument();
    expect(screen.getByText(/F-Block/)).toBeInTheDocument();
  });

  it('calls onBlockClick when a block is clicked', () => {
    const onBlockClick = vi.fn();
    render(<BlockFilter {...defaultProps} onBlockClick={onBlockClick} />);

    fireEvent.click(screen.getByText(/D-Block/).closest('button')!);
    expect(onBlockClick).toHaveBeenCalledWith('d-block');
  });

  it('calls onBlockHover with block id on mouse enter', () => {
    const onBlockHover = vi.fn();
    render(<BlockFilter {...defaultProps} onBlockHover={onBlockHover} />);

    fireEvent.mouseEnter(screen.getByText(/S-Block/).closest('button')!);
    expect(onBlockHover).toHaveBeenCalledWith('s-block');
  });

  it('calls onBlockHover with null on mouse leave', () => {
    const onBlockHover = vi.fn();
    render(<BlockFilter {...defaultProps} onBlockHover={onBlockHover} />);

    fireEvent.mouseLeave(screen.getByText(/S-Block/).closest('button')!);
    expect(onBlockHover).toHaveBeenCalledWith(null);
  });

  it('applies active class to active block filter', () => {
    render(
      <BlockFilter
        {...defaultProps}
        activeBlockFilters={new Set<ElectronBlock>(['d-block'])}
      />,
    );

    const button = screen.getByText(/D-Block/).closest('button');
    expect(button?.className).toContain('active');
  });

  it('supports multiple active block filters', () => {
    render(
      <BlockFilter
        {...defaultProps}
        activeBlockFilters={new Set<ElectronBlock>(['s-block', 'f-block'])}
      />,
    );

    const sButton = screen.getByText(/S-Block/).closest('button');
    const pButton = screen.getByText(/P-Block/).closest('button');
    const fButton = screen.getByText(/F-Block/).closest('button');

    expect(sButton?.className).toContain('active');
    expect(pButton?.className).not.toContain('active');
    expect(fButton?.className).toContain('active');
  });

  it('displays block counts', () => {
    const blockCounts = new Map<ElectronBlock, number>([
      ['s-block', 14],
      ['p-block', 36],
      ['d-block', 40],
      ['f-block', 28],
    ]);
    render(<BlockFilter {...defaultProps} blockCounts={blockCounts} />);

    expect(screen.getByText('(14)')).toBeInTheDocument();
    expect(screen.getByText('(36)')).toBeInTheDocument();
    expect(screen.getByText('(40)')).toBeInTheDocument();
    expect(screen.getByText('(28)')).toBeInTheDocument();
  });
});
