import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Periodic Table of Chemical Elements/)).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders contact email link', () => {
    render(<Footer />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:contact@periodictableofchemicalelements.com');
  });

  it('renders contact email text', () => {
    render(<Footer />);
    expect(screen.getByText('contact@periodictableofchemicalelements.com')).toBeInTheDocument();
  });
});
