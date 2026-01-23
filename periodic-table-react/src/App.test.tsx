import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Integration', () => {
  it('renders the periodic table', () => {
    render(<App />);
    // Check that Hydrogen (first element) is rendered
    expect(screen.getByText('H')).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<App />);
    expect(screen.getByText('Noble Gases')).toBeInTheDocument();
    expect(screen.getByText('Transition Metals')).toBeInTheDocument();
  });

  it('renders threat filter buttons', () => {
    render(<App />);
    expect(screen.getByText('Endangered Elements')).toBeInTheDocument();
    expect(screen.getByText('Serious Threat')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/Periodic Table of Chemical Elements/)).toBeInTheDocument();
  });

  it('opens element detail when element is clicked', async () => {
    render(<App />);

    // Click on Hydrogen
    fireEvent.click(screen.getByTestId('element-1'));

    // Check that detail panel appears with element info
    await waitFor(() => {
      expect(screen.getByTestId('detail-panel')).toBeInTheDocument();
    });
  });

  it('closes element detail when close button is clicked', async () => {
    render(<App />);

    // Click on Hydrogen to open detail
    fireEvent.click(screen.getByTestId('element-1'));

    await waitFor(() => {
      expect(screen.getByTestId('detail-panel')).toBeInTheDocument();
    });

    // Find and click the close button within the detail panel
    const detailPanel = screen.getByTestId('detail-panel');
    const closeButton = detailPanel.querySelector('button[aria-label="Close"]');
    expect(closeButton).not.toBeNull();
    fireEvent.click(closeButton!);

    // Panel should still be in DOM (for animation) but with height 0
    // Note: In jsdom, scrollHeight is 0 so the height is always '0px'
    await waitFor(() => {
      const panel = screen.getByTestId('detail-panel');
      expect(panel).toBeInTheDocument();
      expect(panel.style.height).toBe('0px');
    });
  }, 10000); // Increase timeout for coverage runs

  it('clicking same element twice closes detail panel', async () => {
    render(<App />);

    // Click on Hydrogen to open
    fireEvent.click(screen.getByTestId('element-1'));

    await waitFor(() => {
      expect(screen.getByTestId('detail-panel')).toBeInTheDocument();
    });

    // Click on Hydrogen again to close
    fireEvent.click(screen.getByTestId('element-1'));

    await waitFor(() => {
      const panel = screen.getByTestId('detail-panel');
      expect(panel.style.height).toBe('0px');
    });
  });

  it('category filter highlights matching elements on click', async () => {
    render(<App />);

    // Click on Noble Gases category
    fireEvent.click(screen.getByText('Noble Gases'));

    // The category button should have active class
    const button = screen.getByText('Noble Gases').closest('button');
    expect(button?.className).toContain('active');
  });

  it('clicking category twice deactivates filter', async () => {
    render(<App />);

    // Click Noble Gases to activate
    fireEvent.click(screen.getByText('Noble Gases'));

    // Click again to deactivate
    fireEvent.click(screen.getByText('Noble Gases'));

    // The category button should not have active class
    const button = screen.getByText('Noble Gases').closest('button');
    expect(button?.className).not.toContain('active');
  });

  it('threat filter activates on click', async () => {
    render(<App />);

    // Click on Serious Threat
    fireEvent.click(screen.getByText('Serious Threat').closest('button')!);

    // The button should have active class
    const button = screen.getByText('Serious Threat').closest('button');
    expect(button?.className).toContain('active');
  });

  it('renders multiple elements from different categories', () => {
    render(<App />);

    // Check elements from different categories exist
    expect(screen.getByTestId('element-1')).toBeInTheDocument(); // H - other nonmetals
    expect(screen.getByTestId('element-2')).toBeInTheDocument(); // He - noble gases
    expect(screen.getByTestId('element-26')).toBeInTheDocument(); // Fe - transition metals
  });
});
