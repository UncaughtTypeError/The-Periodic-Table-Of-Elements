import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from './CategoryFilter';
import type { ElementCategory } from '@/types';

describe('CategoryFilter', () => {
  const defaultProps = {
    activeCategories: new Set<ElementCategory>(),
    onCategoryClick: vi.fn(),
    onCategoryHover: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders group labels', () => {
    render(<CategoryFilter {...defaultProps} />);

    expect(screen.getByText('Nonmetals')).toBeInTheDocument();
    expect(screen.getByText('Metals')).toBeInTheDocument();
  });

  it('renders all 10 category buttons', () => {
    render(<CategoryFilter {...defaultProps} />);

    expect(screen.getByText('Other Nonmetals')).toBeInTheDocument();
    expect(screen.getByText('Noble Gases')).toBeInTheDocument();
    expect(screen.getByText('Halogens')).toBeInTheDocument();
    expect(screen.getByText('Metalloids')).toBeInTheDocument();
    expect(screen.getByText('Alkaline Earth Metals')).toBeInTheDocument();
    expect(screen.getByText('Alkali Metals')).toBeInTheDocument();
    expect(screen.getByText('Transition Metals')).toBeInTheDocument();
    expect(screen.getByText('Post Transition Metals')).toBeInTheDocument();
    expect(screen.getByText('Lanthanoids')).toBeInTheDocument();
    expect(screen.getByText('Actinoids')).toBeInTheDocument();
  });

  it('calls onCategoryClick when a category is clicked', () => {
    const onCategoryClick = vi.fn();
    render(<CategoryFilter {...defaultProps} onCategoryClick={onCategoryClick} />);

    fireEvent.click(screen.getByText('Noble Gases'));
    expect(onCategoryClick).toHaveBeenCalledWith('noble-gases');
  });

  it('calls onCategoryHover with category id on mouse enter', () => {
    const onCategoryHover = vi.fn();
    render(<CategoryFilter {...defaultProps} onCategoryHover={onCategoryHover} />);

    fireEvent.mouseEnter(screen.getByText('Halogens').closest('button')!);
    expect(onCategoryHover).toHaveBeenCalledWith('halogens');
  });

  it('calls onCategoryHover with null on mouse leave', () => {
    const onCategoryHover = vi.fn();
    render(<CategoryFilter {...defaultProps} onCategoryHover={onCategoryHover} />);

    fireEvent.mouseLeave(screen.getByText('Halogens').closest('button')!);
    expect(onCategoryHover).toHaveBeenCalledWith(null);
  });

  it('applies active class to active category', () => {
    render(<CategoryFilter {...defaultProps} activeCategories={new Set<ElementCategory>(['noble-gases'])} />);

    const button = screen.getByText('Noble Gases').closest('button');
    expect(button?.className).toContain('active');
  });

  it('does not apply active class to non-active categories', () => {
    render(<CategoryFilter {...defaultProps} activeCategories={new Set<ElementCategory>(['noble-gases'])} />);

    const button = screen.getByText('Halogens').closest('button');
    expect(button?.className).not.toContain('active');
  });

  it('supports multiple active categories', () => {
    render(<CategoryFilter {...defaultProps} activeCategories={new Set<ElementCategory>(['noble-gases', 'halogens'])} />);

    const nobleGasesButton = screen.getByText('Noble Gases').closest('button');
    const halogensButton = screen.getByText('Halogens').closest('button');
    const metalloidsButton = screen.getByText('Metalloids').closest('button');

    expect(nobleGasesButton?.className).toContain('active');
    expect(halogensButton?.className).toContain('active');
    expect(metalloidsButton?.className).not.toContain('active');
  });
});
