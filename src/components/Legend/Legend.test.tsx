import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Legend } from './Legend';
import type { LegendFilter } from '@/types';

describe('Legend', () => {
  const defaultProps = {
    activeLegendFilters: new Set<LegendFilter>(),
    legendCounts: new Map<LegendFilter, number>(),
    onLegendClick: vi.fn(),
    onLegendHover: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all 4 legend items', () => {
    render(<Legend {...defaultProps} />);

    expect(screen.getByText(/^Solid/)).toBeInTheDocument();
    expect(screen.getByText(/^Liquid/)).toBeInTheDocument();
    expect(screen.getByText(/^Gas/)).toBeInTheDocument();
    expect(screen.getByText(/^Radioactive/)).toBeInTheDocument();
  });

  it('renders divider between state icons and radioactive', () => {
    const { container } = render(<Legend {...defaultProps} />);
    const buttons = container.querySelectorAll('button');
    const divider = container.querySelector('[class*="divider"]');

    expect(buttons).toHaveLength(4);
    expect(divider).toBeInTheDocument();
  });

  it('calls onLegendClick with solid when Solid is clicked', () => {
    const onLegendClick = vi.fn();
    render(<Legend {...defaultProps} onLegendClick={onLegendClick} />);

    fireEvent.click(screen.getByText(/^Solid/).closest('button')!);
    expect(onLegendClick).toHaveBeenCalledWith('solid');
  });

  it('calls onLegendClick with radioactive when Radioactive is clicked', () => {
    const onLegendClick = vi.fn();
    render(<Legend {...defaultProps} onLegendClick={onLegendClick} />);

    fireEvent.click(screen.getByText(/^Radioactive/).closest('button')!);
    expect(onLegendClick).toHaveBeenCalledWith('radioactive');
  });

  it('calls onLegendHover with filter id on mouse enter', () => {
    const onLegendHover = vi.fn();
    render(<Legend {...defaultProps} onLegendHover={onLegendHover} />);

    fireEvent.mouseEnter(screen.getByText(/^Gas/).closest('button')!);
    expect(onLegendHover).toHaveBeenCalledWith('gas');
  });

  it('calls onLegendHover with null on mouse leave', () => {
    const onLegendHover = vi.fn();
    render(<Legend {...defaultProps} onLegendHover={onLegendHover} />);

    fireEvent.mouseLeave(screen.getByText(/^Gas/).closest('button')!);
    expect(onLegendHover).toHaveBeenCalledWith(null);
  });

  it('applies active class to active legend filter', () => {
    render(
      <Legend
        {...defaultProps}
        activeLegendFilters={new Set<LegendFilter>(['solid'])}
      />,
    );

    const button = screen.getByText(/^Solid/).closest('button');
    expect(button?.className).toContain('active');
  });

  it('supports multiple active legend filters', () => {
    render(
      <Legend
        {...defaultProps}
        activeLegendFilters={new Set<LegendFilter>(['solid', 'radioactive'])}
      />,
    );

    const solidButton = screen.getByText(/^Solid/).closest('button');
    const liquidButton = screen.getByText(/^Liquid/).closest('button');
    const radioactiveButton = screen
      .getByText(/^Radioactive/)
      .closest('button');

    expect(solidButton?.className).toContain('active');
    expect(radioactiveButton?.className).toContain('active');
    expect(liquidButton?.className).not.toContain('active');
  });
});
