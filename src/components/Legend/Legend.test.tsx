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

  it('renders all 7 legend items', () => {
    render(<Legend {...defaultProps} />);

    expect(screen.getByText(/^Primordial/)).toBeInTheDocument();
    expect(screen.getByText(/^From Decay/)).toBeInTheDocument();
    expect(screen.getByText(/^Synthetic/)).toBeInTheDocument();
    expect(screen.getByText(/^Solid/)).toBeInTheDocument();
    expect(screen.getByText(/^Liquid/)).toBeInTheDocument();
    expect(screen.getByText(/^Gas/)).toBeInTheDocument();
    expect(screen.getByText(/^Radioactive/)).toBeInTheDocument();
  });

  it('renders 7 buttons and 2 dividers', () => {
    const { container } = render(<Legend {...defaultProps} />);
    const buttons = container.querySelectorAll('button');
    const dividers = container.querySelectorAll('[class*="divider"]');

    expect(buttons).toHaveLength(7);
    expect(dividers).toHaveLength(2);
  });

  it('calls onLegendClick with primordial when Primordial is clicked', () => {
    const onLegendClick = vi.fn();
    render(<Legend {...defaultProps} onLegendClick={onLegendClick} />);

    fireEvent.click(screen.getByText(/^Primordial/).closest('button')!);
    expect(onLegendClick).toHaveBeenCalledWith('primordial');
  });

  it('calls onLegendClick with from-decay when From Decay is clicked', () => {
    const onLegendClick = vi.fn();
    render(<Legend {...defaultProps} onLegendClick={onLegendClick} />);

    fireEvent.click(screen.getByText(/^From Decay/).closest('button')!);
    expect(onLegendClick).toHaveBeenCalledWith('from-decay');
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

  it('calls onLegendHover with occurrence id on mouse enter', () => {
    const onLegendHover = vi.fn();
    render(<Legend {...defaultProps} onLegendHover={onLegendHover} />);

    fireEvent.mouseEnter(screen.getByText(/^Synthetic/).closest('button')!);
    expect(onLegendHover).toHaveBeenCalledWith('synthetic');
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

  it('applies active class to active occurrence filter', () => {
    render(
      <Legend
        {...defaultProps}
        activeLegendFilters={new Set<LegendFilter>(['primordial'])}
      />,
    );

    const button = screen.getByText(/^Primordial/).closest('button');
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

  it('supports mixed occurrence and state active filters', () => {
    render(
      <Legend
        {...defaultProps}
        activeLegendFilters={new Set<LegendFilter>(['from-decay', 'gas'])}
      />,
    );

    const fromDecayButton = screen.getByText(/^From Decay/).closest('button');
    const gasButton = screen.getByText(/^Gas/).closest('button');
    const primordialButton = screen.getByText(/^Primordial/).closest('button');

    expect(fromDecayButton?.className).toContain('active');
    expect(gasButton?.className).toContain('active');
    expect(primordialButton?.className).not.toContain('active');
  });
});
