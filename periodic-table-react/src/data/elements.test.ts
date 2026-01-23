import { describe, it, expect } from 'vitest';
import { elements } from './elements';

describe('Elements Data', () => {
  it('contains 118 elements', () => {
    expect(elements).toHaveLength(118);
  });

  it('elements have unique atomic numbers', () => {
    const atomicNumbers = elements.map(e => e.atomicNumber);
    const uniqueNumbers = new Set(atomicNumbers);
    expect(uniqueNumbers.size).toBe(118);
  });

  it('first element is Hydrogen', () => {
    const hydrogen = elements.find(e => e.atomicNumber === 1);
    expect(hydrogen?.symbol).toBe('H');
    expect(hydrogen?.name).toBe('Hydrogen');
  });

  it('last element is Oganesson', () => {
    const oganesson = elements.find(e => e.atomicNumber === 118);
    expect(oganesson?.symbol).toBe('Og');
    expect(oganesson?.name).toBe('Oganesson');
  });

  it('all elements have required properties', () => {
    elements.forEach((element) => {
      expect(element.symbol).toBeDefined();
      expect(element.symbol.length).toBeGreaterThanOrEqual(1);
      expect(element.symbol.length).toBeLessThanOrEqual(3);

      expect(element.name).toBeDefined();
      expect(element.name.length).toBeGreaterThan(0);

      expect(element.atomicNumber).toBeDefined();
      expect(element.atomicNumber).toBeGreaterThan(0);
      expect(element.atomicNumber).toBeLessThanOrEqual(118);

      expect(element.atomicMass).toBeDefined();
      expect(typeof element.atomicMass).toBe('number');
      expect(Number.isNaN(element.atomicMass)).toBe(false);

      expect(typeof element.isSynthetic).toBe('boolean');

      expect(element.category).toBeDefined();
      expect([
        'other-nonmetals',
        'noble-gases',
        'halogens',
        'metalloids',
        'alkaline-earth-metals',
        'alkali-metals',
        'transition-metals',
        'post-transition-metals',
        'lanthanoids',
        'actinoids',
      ]).toContain(element.category);

      expect(element.period).toBeDefined();
      expect(element.period).toBeGreaterThanOrEqual(1);
      expect(element.period).toBeLessThanOrEqual(7);

      expect(element.electronShells).toBeDefined();
      expect(element.summary).toBeDefined();
      expect(element.detail).toBeDefined();
      expect(element.detail.description).toBeDefined();
      expect(Array.isArray(element.detail.description)).toBe(true);
    });
  });

  it('contains noble gases', () => {
    const nobleGases = elements.filter((e) => e.category === 'noble-gases');
    expect(nobleGases.length).toBeGreaterThanOrEqual(6);
    expect(nobleGases.map((e) => e.symbol)).toContain('He');
    expect(nobleGases.map((e) => e.symbol)).toContain('Ne');
    expect(nobleGases.map((e) => e.symbol)).toContain('Ar');
  });

  it('contains halogens', () => {
    const halogens = elements.filter((e) => e.category === 'halogens');
    expect(halogens.length).toBe(5); // F, Cl, Br, I, At
    expect(halogens.map((e) => e.symbol)).toContain('F');
    expect(halogens.map((e) => e.symbol)).toContain('Cl');
    expect(halogens.map((e) => e.symbol)).toContain('Br');
    expect(halogens.map((e) => e.symbol)).toContain('I');
    expect(halogens.map((e) => e.symbol)).toContain('At');
  });

  it('contains metalloids', () => {
    const metalloids = elements.filter((e) => e.category === 'metalloids');
    expect(metalloids.length).toBe(8); // B, Si, Ge, As, Sb, Te, Po, Ts
    expect(metalloids.map((e) => e.symbol)).toContain('B');
    expect(metalloids.map((e) => e.symbol)).toContain('Si');
    expect(metalloids.map((e) => e.symbol)).toContain('Po');
    expect(metalloids.map((e) => e.symbol)).toContain('Ts');
  });

  it('contains post-transition metals', () => {
    const postTransition = elements.filter((e) => e.category === 'post-transition-metals');
    expect(postTransition.length).toBe(11); // Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv
    expect(postTransition.map((e) => e.symbol)).toContain('Al');
    expect(postTransition.map((e) => e.symbol)).toContain('Pb');
    expect(postTransition.map((e) => e.symbol)).toContain('Bi');
  });

  it('contains lanthanides', () => {
    const lanthanides = elements.filter((e) => e.category === 'lanthanoids');
    expect(lanthanides.length).toBe(15);
  });

  it('contains actinides', () => {
    const actinides = elements.filter((e) => e.category === 'actinoids');
    expect(actinides.length).toBe(15);
  });

  it('some elements have threat levels', () => {
    const endangeredElements = elements.filter((e) => e.threatLevel !== null);
    expect(endangeredElements.length).toBeGreaterThan(0);
  });

  it('Helium has serious threat level', () => {
    const helium = elements.find((e) => e.symbol === 'He');
    expect(helium?.threatLevel).toBe('serious');
  });

  it('synthetic elements have isSynthetic flag set to true', () => {
    // Check a few known synthetic elements
    const technetium = elements.find((e) => e.symbol === 'Tc');
    expect(technetium?.isSynthetic).toBe(true);
    expect(technetium?.atomicMass).toBe(98);

    const americium = elements.find((e) => e.symbol === 'Am');
    expect(americium?.isSynthetic).toBe(true);
    expect(americium?.atomicMass).toBe(243);

    const oganesson = elements.find((e) => e.symbol === 'Og');
    expect(oganesson?.isSynthetic).toBe(true);
    expect(oganesson?.atomicMass).toBe(294);
  });

  it('natural elements have isSynthetic flag set to false', () => {
    const hydrogen = elements.find((e) => e.symbol === 'H');
    expect(hydrogen?.isSynthetic).toBe(false);

    const carbon = elements.find((e) => e.symbol === 'C');
    expect(carbon?.isSynthetic).toBe(false);

    const gold = elements.find((e) => e.symbol === 'Au');
    expect(gold?.isSynthetic).toBe(false);
  });

  it('has exactly 34 synthetic elements', () => {
    const syntheticElements = elements.filter((e) => e.isSynthetic);
    expect(syntheticElements.length).toBe(34);
  });
});
