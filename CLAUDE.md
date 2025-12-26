# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run CLI interactively
npm start

# Run tests (requires experimental VM modules flag for ES modules)
npm test

# Run tests with coverage
npm test:coverage

# Run a single test file
node --experimental-vm-modules node_modules/jest/bin/jest.js src/pig-latin.test.js

# Run tests matching a pattern
node --experimental-vm-modules node_modules/jest/bin/jest.js -t "isPigLatin"
```

## Architecture

This is an ES module Node.js CLI that converts English text to Pig Latin.

**Entry point**: `src/index.js` - Interactive REPL using readline that:
1. Checks if input is already Pig Latin (skips conversion if so)
2. Converts English text to Pig Latin

**Core logic**: `src/pig-latin.js` exports four functions:
- `toPigLatin(word)` - Converts a single word
- `convertToPigLatin(text)` - Converts text preserving punctuation/numbers
- `isPigLatin(word)` - Detects if a single word is in Pig Latin
- `containsPigLatin(text)` - Detects if text contains any Pig Latin words

**Pig Latin rules implemented**:
- Vowel-start words: add "way" (apple → appleway)
- Consonant-start words: move leading consonants to end, add "ay" (hello → ellohay)
- No vowels: just add "ay" (rhythm → rhythmay)

**Detection patterns**:
- Vowel-start pattern: ends in "way" with vowel-starting base (≥2 chars)
- Consonant-start pattern: ends in consonant(s) + "ay" with vowel-starting base
