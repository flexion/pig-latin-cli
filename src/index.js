#!/usr/bin/env node

import * as readline from 'readline';
import { containsPigLatin, convertToPigLatin } from './pig-latin.js';

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

    if (containsPigLatin(input)) {
      console.log('=> Input appears to already be in Pig Latin. Skipping conversion.\n');
      prompt();
      return;
    }

    const result = convertToPigLatin(input);
    console.log(`=> ${result}\n`);
    prompt();
  });
}

prompt();
