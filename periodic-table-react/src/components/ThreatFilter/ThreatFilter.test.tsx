import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThreatFilter } from './ThreatFilter';
import type { ThreatLevel } from '../../types';

describe('ThreatFilter', () => {
  const defaultProps = {
    activeThreatLevels: new Set<NonNullable<ThreatLevel>>(),
    onThreatClick: vi.fn(),
    onThreatHover: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders endangered elements title', () => {
    render(<ThreatFilter {...defaultProps} />);
    expect(screen.getByText('Endangered Elements')).toBeInTheDocument();
  });

  it('renders all 3 threat level buttons', () => {
    render(<ThreatFilter {...defaultProps} />);

    expect(screen.getByText('Limited Availability')).toBeInTheDocument();
    expect(screen.getByText('Rising Threat')).toBeInTheDocument();
    expect(screen.getByText('Serious Threat')).toBeInTheDocument();
  });

  it('renders threat descriptions', () => {
    render(<ThreatFilter {...defaultProps} />);

    expect(screen.getByText('Future risk to supply')).toBeInTheDocument();
    expect(screen.getByText('From increased use')).toBeInTheDocument();
    expect(screen.getByText('In the next 100 years')).toBeInTheDocument();
  });

  it('calls onThreatClick when a threat level is clicked', () => {
    const onThreatClick = vi.fn();
    render(<ThreatFilter {...defaultProps} onThreatClick={onThreatClick} />);

    fireEvent.click(screen.getByText('Serious Threat').closest('button')!);
    expect(onThreatClick).toHaveBeenCalledWith('serious');
  });

  it('calls onThreatHover with threat id on mouse enter', () => {
    const onThreatHover = vi.fn();
    render(<ThreatFilter {...defaultProps} onThreatHover={onThreatHover} />);

    fireEvent.mouseEnter(screen.getByText('Rising Threat').closest('button')!);
    expect(onThreatHover).toHaveBeenCalledWith('rising');
  });

  it('calls onThreatHover with null on mouse leave', () => {
    const onThreatHover = vi.fn();
    render(<ThreatFilter {...defaultProps} onThreatHover={onThreatHover} />);

    fireEvent.mouseLeave(screen.getByText('Rising Threat').closest('button')!);
    expect(onThreatHover).toHaveBeenCalledWith(null);
  });

  it('applies active class to active threat level', () => {
    render(<ThreatFilter {...defaultProps} activeThreatLevels={new Set<NonNullable<ThreatLevel>>(['serious'])} />);

    const button = screen.getByText('Serious Threat').closest('button');
    expect(button?.className).toContain('active');
  });

  it('supports multiple active threat levels', () => {
    render(<ThreatFilter {...defaultProps} activeThreatLevels={new Set<NonNullable<ThreatLevel>>(['serious', 'rising'])} />);

    const seriousButton = screen.getByText('Serious Threat').closest('button');
    const risingButton = screen.getByText('Rising Threat').closest('button');
    const limitedButton = screen.getByText('Limited Availability').closest('button');

    expect(seriousButton?.className).toContain('active');
    expect(risingButton?.className).toContain('active');
    expect(limitedButton?.className).not.toContain('active');
  });
});
