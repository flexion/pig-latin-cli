const VOWELS = ['a', 'e', 'i', 'o', 'u'];

export function toPigLatin(word) {
  if (!word) return word;

  const lowerWord = word.toLowerCase();

  // Check if word starts with a vowel
  if (VOWELS.includes(lowerWord[0])) {
    return word + 'way';
  }

  // Find the first vowel position
  let firstVowelIndex = -1;
  for (let i = 0; i < lowerWord.length; i++) {
    if (VOWELS.includes(lowerWord[i])) {
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

export function isPigLatin(word) {
  if (!word || word.length < 3) return false;

  const lower = word.toLowerCase();

  // Pattern 1: Vowel-start words end in "way"
  // e.g., "appleway" -> base "apple" starts with vowel
  if (lower.endsWith('way')) {
    const base = lower.slice(0, -3);
    if (base.length >= 2 && VOWELS.includes(base[0])) {
      return true;
    }
  }

  // Pattern 2: Consonant-start words end in consonant(s) + "ay"
  // e.g., "ellohay" -> base "ello" + moved consonants "h" + "ay"
  if (lower.endsWith('ay')) {
    const withoutAy = lower.slice(0, -2);

    // Try each possible split point to find valid base + consonant cluster
    for (let splitPoint = withoutAy.length - 1; splitPoint >= 1; splitPoint--) {
      const base = withoutAy.slice(0, splitPoint);
      const consonants = withoutAy.slice(splitPoint);

      const allConsonants = [...consonants].every(c => !VOWELS.includes(c));
      if (allConsonants && base.length >= 2 && VOWELS.includes(base[0])) {
        return true;
      }
    }
  }

  return false;
}

export function containsPigLatin(text) {
  if (!text) return false;

  // Split by word boundaries and check each word
  const parts = text.split(/\b/);
  return parts.some(part => {
    if (/^[a-zA-Z]+$/.test(part)) {
      return isPigLatin(part);
    }
    return false;
  });
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
