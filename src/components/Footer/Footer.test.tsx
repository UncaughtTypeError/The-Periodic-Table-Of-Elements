import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Periodic Table of Chemical Elements/),
    ).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders GitHub repo link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /GitHub/i });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/UncaughtTypeError/The-Periodic-Table-Of-Elements',
    );
  });

  it('renders legacy version link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Legacy Version/i });
    expect(link).toHaveAttribute('href', '/legacy/index.html');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
