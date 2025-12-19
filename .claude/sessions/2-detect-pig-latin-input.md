# Session: Detect Pig Latin Input

**Issue**: #2
**Branch**: issue/feature-2/detect-pig-latin-input
**Type**: feature
**Created**: 2025-12-18
**Status**: in-progress

## Goal
Add detection to identify when input text is already in Pig Latin format, preventing double-conversion.

## Approach
1. Add `isPigLatin(word)` function to detect Pig Latin patterns:
   - Words ending in 'way' (vowel-start pattern)
   - Words ending in consonants + 'ay' (consonant-start pattern)
2. Add `containsPigLatin(text)` to check if any word is Pig Latin
3. Skip conversion entirely if any word is detected as Pig Latin, with a warning message

## Session Log
- 2025-12-18: Session created
- 2025-12-18: Discussed approach with user - decided to skip if any word is Pig Latin
- 2025-12-18: Implemented isPigLatin() and containsPigLatin() functions
- 2025-12-18: Updated prompt loop to warn and skip
- 2025-12-18: Tested all acceptance criteria - all passing
- 2025-12-18: Added Jest tests with coverage reporting (100% coverage)

## Key Decisions
- Skip entire input if any word is detected as Pig Latin (rather than partial conversion)

## Learnings
- None yet

## Files Changed
- src/index.js - CLI entry point, imports from pig-latin.js
- src/pig-latin.js - extracted logic functions with detection
- src/pig-latin.test.js - Jest tests (40 tests, 100% coverage)
- package.json - added Jest config and test scripts

## Next Steps
- [x] Add isPigLatin detection function
- [x] Add containsPigLatin check for text
- [x] Modify prompt loop to warn and skip
- [x] Test the implementation
- [ ] Commit changes
