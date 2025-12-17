#!/usr/bin/env node

import * as readline from 'readline';

function toPigLatin(word) {
  if (!word) return word;

  const vowels = ['a', 'e', 'i', 'o', 'u'];
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

function convertToPigLatin(text) {
  // Split by word boundaries while preserving punctuation
  return text.split(/\b/).map(part => {
    // Only convert actual words (letters only)
    if (/^[a-zA-Z]+$/.test(part)) {
      return toPigLatin(part);
    }
    return part;
  }).join('');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Pig Latin Converter');
console.log('Type text to convert (or "quit" to exit)\n');

function prompt() {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'quit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    const result = convertToPigLatin(input);
    console.log(`=> ${result}\n`);
    prompt();
  });
}

prompt();
