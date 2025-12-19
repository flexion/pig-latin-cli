const vowels = ['a', 'e', 'i', 'o', 'u'];

export function isPigLatin(word) {
  if (!word || word.length < 3) return false;

  const lowerWord = word.toLowerCase();

  // Check for vowel-start Pig Latin pattern: ends in 'way'
  if (lowerWord.endsWith('way') && lowerWord.length > 3) {
    const base = lowerWord.slice(0, -3);
    // Original word would start with a vowel, and must be at least 2 chars
    // (avoids false positives like "away" which is a natural English word)
    if (base.length >= 2 && vowels.includes(base[0])) {
      return true;
    }
  }

  // Check for consonant-start Pig Latin pattern: ends in consonant(s) + 'ay'
  if (lowerWord.endsWith('ay') && lowerWord.length > 2) {
    const withoutAy = lowerWord.slice(0, -2);

    // Find trailing consonants (these would be the original leading consonants)
    let consonantStart = withoutAy.length;
    for (let i = withoutAy.length - 1; i >= 0; i--) {
      if (vowels.includes(withoutAy[i])) {
        break;
      }
      consonantStart = i;
    }

    // Must have at least one trailing consonant and some base before it
    if (consonantStart > 0 && consonantStart < withoutAy.length) {
      const base = withoutAy.slice(0, consonantStart);
      // The base should start with a vowel (as consonants were moved to end)
      if (vowels.includes(base[0])) {
        return true;
      }
    }
  }

  return false;
}

export function containsPigLatin(text) {
  const words = text.split(/\b/).filter(part => /^[a-zA-Z]+$/.test(part));
  return words.some(word => isPigLatin(word));
}

export function toPigLatin(word) {
  if (!word) return word;

  const lowerWord = word.toLowerCase();

  // Check if word starts with a vowel
  if (vowels.includes(lowerWord[0])) {
    return word + 'way';
  }

  // Find the first vowel position
  let firstVowelIndex = -1;
  for (let i = 0; i < lowerWord.length; i++) {
    if (vowels.includes(lowerWord[i])) {
      firstVowelIndex = i;
      break;
    }
  }

  // No vowels found, just add 'ay'
  if (firstVowelIndex === -1) {
    return word + 'ay';
  }

  // Move consonants to end and add 'ay'
  const consonants = word.slice(0, firstVowelIndex);
  const rest = word.slice(firstVowelIndex);
  return rest + consonants.toLowerCase() + 'ay';
}

export function convertToPigLatin(text) {
  // Split by word boundaries while preserving punctuation
  return text.split(/\b/).map(part => {
    // Only convert actual words (letters only)
    if (/^[a-zA-Z]+$/.test(part)) {
      return toPigLatin(part);
    }
    return part;
  }).join('');
}
