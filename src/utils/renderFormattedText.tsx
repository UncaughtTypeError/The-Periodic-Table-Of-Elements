import type { ReactNode } from 'react';

/**
 * Parse a string containing <sup>...</sup> tags into React elements.
 */
export function renderFormattedText(text: string): ReactNode {
  const parts = text.split(/(<sup>.*?<\/sup>)/);
  return parts.map((part, i) => {
    const supMatch = part.match(/^<sup>(.*?)<\/sup>$/);
    if (supMatch) return <sup key={i}>{supMatch[1]}</sup>;
    return part;
  });
}
