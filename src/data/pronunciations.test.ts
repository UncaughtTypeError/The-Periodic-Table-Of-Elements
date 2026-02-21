import { describe, it, expect } from 'vitest';
import { getPronunciation } from './pronunciations';
import { elements } from './elements';

describe('Pronunciations Data', () => {
  it('has a pronunciation for every element', () => {
    for (const element of elements) {
      const pron = getPronunciation(element.symbol);
      expect(
        pron,
        `Missing pronunciation for ${element.symbol}`,
      ).not.toBeNull();
    }
  });

  it('every entry has non-empty ipa and respelling', () => {
    for (const element of elements) {
      const pron = getPronunciation(element.symbol)!;
      expect(pron.ipa, `${element.symbol} missing ipa`).toBeTruthy();
      expect(
        pron.respelling,
        `${element.symbol} missing respelling`,
      ).toBeTruthy();
    }
  });

  it('returns null for unknown symbol', () => {
    expect(getPronunciation('Xx')).toBeNull();
  });

  it('ipa values are wrapped in slashes', () => {
    for (const element of elements) {
      const pron = getPronunciation(element.symbol)!;
      expect(pron.ipa, `${element.symbol} ipa not wrapped in /`).toMatch(
        /^\/.*\/$/,
      );
    }
  });
});
