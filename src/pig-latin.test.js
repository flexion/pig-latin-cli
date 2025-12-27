import { toPigLatin, convertToPigLatin, isPigLatin, containsPigLatin } from './pig-latin.js';

describe('toPigLatin', () => {
  it('returns empty string for empty input', () => {
    expect(toPigLatin('')).toBe('');
  });

  it('returns undefined for undefined input', () => {
    expect(toPigLatin(undefined)).toBe(undefined);
  });

  it('adds "way" to vowel-start words', () => {
    expect(toPigLatin('apple')).toBe('appleway');
    expect(toPigLatin('egg')).toBe('eggway');
    expect(toPigLatin('ice')).toBe('iceway');
    expect(toPigLatin('orange')).toBe('orangeway');
    expect(toPigLatin('umbrella')).toBe('umbrellaway');
  });

  it('moves consonants to end and adds "ay"', () => {
    expect(toPigLatin('hello')).toBe('ellohay');
    expect(toPigLatin('world')).toBe('orldway');
    expect(toPigLatin('pig')).toBe('igpay');
    expect(toPigLatin('latin')).toBe('atinlay');
  });

  it('handles consonant clusters', () => {
    expect(toPigLatin('string')).toBe('ingstray');
    expect(toPigLatin('chrome')).toBe('omechray');
    expect(toPigLatin('three')).toBe('eethray');
  });

  it('adds "ay" to words with no vowels', () => {
    expect(toPigLatin('rhythm')).toBe('rhythmay');
    expect(toPigLatin('my')).toBe('myay');
  });

  it('preserves capitalization of moved consonants as lowercase', () => {
    expect(toPigLatin('Hello')).toBe('ellohay');
    expect(toPigLatin('String')).toBe('ingstray');
  });
});

describe('convertToPigLatin', () => {
  it('converts a single word', () => {
    expect(convertToPigLatin('hello')).toBe('ellohay');
  });

  it('converts multiple words', () => {
    expect(convertToPigLatin('hello world')).toBe('ellohay orldway');
  });

  it('preserves punctuation', () => {
    expect(convertToPigLatin('hello, world!')).toBe('ellohay, orldway!');
  });

  it('preserves numbers', () => {
    expect(convertToPigLatin('test 123 hello')).toBe('esttay 123 ellohay');
  });

  it('handles empty string', () => {
    expect(convertToPigLatin('')).toBe('');
  });
});

describe('isPigLatin', () => {
  describe('vowel-start pattern (ends in "way")', () => {
    it('detects words ending in "way" with vowel-starting base', () => {
      expect(isPigLatin('appleway')).toBe(true);
      expect(isPigLatin('eggway')).toBe(true);
      expect(isPigLatin('iceway')).toBe(true);
      expect(isPigLatin('orangeway')).toBe(true);
      expect(isPigLatin('umbrellaway')).toBe(true);
    });

    it('rejects words ending in "way" with base < 2 chars', () => {
      expect(isPigLatin('away')).toBe(false); // base "a" is 1 char
      expect(isPigLatin('way')).toBe(false); // no base
    });

    it('rejects words ending in "way" with consonant-starting base', () => {
      expect(isPigLatin('sway')).toBe(false); // base "s" starts with consonant
      expect(isPigLatin('stairway')).toBe(false); // base "stair" starts with consonant
      expect(isPigLatin('highway')).toBe(false);
    });
  });

  describe('consonant-start pattern (ends in consonant(s) + "ay")', () => {
    it('detects words with consonant cluster + "ay" and vowel-starting base', () => {
      expect(isPigLatin('ellohay')).toBe(true); // hello
      expect(isPigLatin('igpay')).toBe(true); // pig
      expect(isPigLatin('atinlay')).toBe(true); // latin
      expect(isPigLatin('ingstray')).toBe(true); // string
      expect(isPigLatin('omechray')).toBe(true); // chrome
    });

    it('rejects regular English words ending in "ay"', () => {
      expect(isPigLatin('play')).toBe(false); // no consonant cluster before "ay"
      expect(isPigLatin('day')).toBe(false);
      expect(isPigLatin('say')).toBe(false);
      expect(isPigLatin('bay')).toBe(false);
      expect(isPigLatin('okay')).toBe(false); // base "ok" starts with vowel but no consonant cluster
    });
  });

  describe('edge cases', () => {
    it('returns false for empty or short strings', () => {
      expect(isPigLatin('')).toBe(false);
      expect(isPigLatin('a')).toBe(false);
      expect(isPigLatin('ay')).toBe(false);
    });

    it('returns false for regular English words', () => {
      expect(isPigLatin('hello')).toBe(false);
      expect(isPigLatin('world')).toBe(false);
      expect(isPigLatin('apple')).toBe(false);
    });

    it('handles case insensitivity', () => {
      expect(isPigLatin('Ellohay')).toBe(true);
      expect(isPigLatin('APPLEWAY')).toBe(true);
    });
  });
});

describe('containsPigLatin', () => {
  it('returns true if any word is Pig Latin', () => {
    expect(containsPigLatin('ellohay world')).toBe(true);
    expect(containsPigLatin('hello orldway')).toBe(true);
    expect(containsPigLatin('appleway is good')).toBe(true);
  });

  it('returns true if all words are Pig Latin', () => {
    expect(containsPigLatin('ellohay orldway')).toBe(true);
  });

  it('returns false if no words are Pig Latin', () => {
    expect(containsPigLatin('hello world')).toBe(false);
    expect(containsPigLatin('the quick brown fox')).toBe(false);
  });

  it('handles empty string', () => {
    expect(containsPigLatin('')).toBe(false);
  });

  it('ignores punctuation when checking words', () => {
    expect(containsPigLatin('ellohay, world!')).toBe(true);
    expect(containsPigLatin('hello, world!')).toBe(false);
  });

  it('ignores numbers', () => {
    expect(containsPigLatin('test 123 ellohay')).toBe(true);
    expect(containsPigLatin('test 123 hello')).toBe(false);
  });
});
