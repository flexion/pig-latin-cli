import { isPigLatin, containsPigLatin, toPigLatin, convertToPigLatin } from './pig-latin.js';

describe('isPigLatin', () => {
  describe('vowel-start pattern (ends in "way")', () => {
    test('detects "appleway" as Pig Latin', () => {
      expect(isPigLatin('appleway')).toBe(true);
    });

    test('detects "orangeway" as Pig Latin', () => {
      expect(isPigLatin('orangeway')).toBe(true);
    });

    test('does not detect "way" alone as Pig Latin', () => {
      expect(isPigLatin('way')).toBe(false);
    });

    test('does not detect "sway" as Pig Latin (consonant before "way")', () => {
      expect(isPigLatin('sway')).toBe(false);
    });
  });

  describe('consonant-start pattern (ends in consonant + "ay")', () => {
    test('detects "ellohay" as Pig Latin (hello)', () => {
      expect(isPigLatin('ellohay')).toBe(true);
    });

    test('detects "orldway" as Pig Latin (world)', () => {
      expect(isPigLatin('orldway')).toBe(true);
    });

    test('detects "atcay" as Pig Latin (cat)', () => {
      expect(isPigLatin('atcay')).toBe(true);
    });

    test('detects "easeplay" as Pig Latin (please)', () => {
      expect(isPigLatin('easeplay')).toBe(true);
    });
  });

  describe('natural English words (should NOT detect)', () => {
    test('does not detect "day" as Pig Latin', () => {
      expect(isPigLatin('day')).toBe(false);
    });

    test('does not detect "say" as Pig Latin', () => {
      expect(isPigLatin('say')).toBe(false);
    });

    test('does not detect "play" as Pig Latin', () => {
      expect(isPigLatin('play')).toBe(false);
    });

    test('does not detect "stay" as Pig Latin', () => {
      expect(isPigLatin('stay')).toBe(false);
    });

    // Note: "away" matches Pig Latin pattern (a + w + ay) and is detected as such.
    // This is a known limitation - some English words structurally match Pig Latin.
  });

  describe('edge cases', () => {
    test('returns false for empty string', () => {
      expect(isPigLatin('')).toBe(false);
    });

    test('returns false for null', () => {
      expect(isPigLatin(null)).toBe(false);
    });

    test('returns false for undefined', () => {
      expect(isPigLatin(undefined)).toBe(false);
    });

    test('returns false for short words (< 3 chars)', () => {
      expect(isPigLatin('ay')).toBe(false);
      expect(isPigLatin('a')).toBe(false);
    });
  });
});

describe('containsPigLatin', () => {
  test('returns true when any word is Pig Latin', () => {
    expect(containsPigLatin('ellohay world')).toBe(true);
  });

  test('returns true for fully converted text', () => {
    expect(containsPigLatin('ellohay orldway')).toBe(true);
  });

  test('returns false for plain English text', () => {
    expect(containsPigLatin('hello world')).toBe(false);
  });

  test('returns false for natural English words ending in "ay"', () => {
    expect(containsPigLatin('I say hello every day')).toBe(false);
  });

  test('handles punctuation correctly', () => {
    expect(containsPigLatin('ellohay!')).toBe(true);
    expect(containsPigLatin('Hello, world.')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(containsPigLatin('')).toBe(false);
  });
});

describe('toPigLatin', () => {
  describe('vowel-start words', () => {
    test('converts "apple" to "appleway"', () => {
      expect(toPigLatin('apple')).toBe('appleway');
    });

    test('converts "orange" to "orangeway"', () => {
      expect(toPigLatin('orange')).toBe('orangeway');
    });

    test('converts "I" to "Iway"', () => {
      expect(toPigLatin('I')).toBe('Iway');
    });
  });

  describe('consonant-start words', () => {
    test('converts "hello" to "ellohay"', () => {
      expect(toPigLatin('hello')).toBe('ellohay');
    });

    test('converts "world" to "orldway"', () => {
      expect(toPigLatin('world')).toBe('orldway');
    });

    test('converts "cat" to "atcay"', () => {
      expect(toPigLatin('cat')).toBe('atcay');
    });

    test('converts "please" to "easeplay"', () => {
      expect(toPigLatin('please')).toBe('easeplay');
    });

    test('converts "string" to "ingstray"', () => {
      expect(toPigLatin('string')).toBe('ingstray');
    });
  });

  describe('words with no vowels', () => {
    test('converts "my" to "myay"', () => {
      expect(toPigLatin('my')).toBe('myay');
    });

    test('converts "rhythm" to "rhythmay"', () => {
      expect(toPigLatin('rhythm')).toBe('rhythmay');
    });
  });

  describe('edge cases', () => {
    test('returns empty string for empty input', () => {
      expect(toPigLatin('')).toBe('');
    });

    test('returns null for null input', () => {
      expect(toPigLatin(null)).toBe(null);
    });

    test('returns undefined for undefined input', () => {
      expect(toPigLatin(undefined)).toBe(undefined);
    });
  });
});

describe('convertToPigLatin', () => {
  test('converts a simple sentence', () => {
    expect(convertToPigLatin('hello world')).toBe('ellohay orldway');
  });

  test('preserves punctuation', () => {
    expect(convertToPigLatin('Hello, world!')).toBe('ellohay, orldway!');
  });

  test('handles mixed vowel and consonant start words', () => {
    expect(convertToPigLatin('I love apples')).toBe('Iway ovelay applesway');
  });

  test('preserves numbers and special characters', () => {
    expect(convertToPigLatin('Call 911 now')).toBe('allcay 911 ownay');
  });

  test('returns empty string for empty input', () => {
    expect(convertToPigLatin('')).toBe('');
  });
});
