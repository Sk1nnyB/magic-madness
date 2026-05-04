import effects from './effects';

describe('effects data', () => {
  test('effects is an array', () => {
    expect(Array.isArray(effects)).toBe(true);
  });

  test('effects array is not empty', () => {
    expect(effects.length).toBeGreaterThan(0);
  });

  test('each effect has required properties', () => {
    effects.forEach((effect, index) => {
      expect(effect).toHaveProperty('effect');
      expect(effect).toHaveProperty('image');
      expect(typeof effect.effect).toBe('string');
      expect(typeof effect.image).toBe('string');
    });
  });
});