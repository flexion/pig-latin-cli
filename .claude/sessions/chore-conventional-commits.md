# Session: conventional-commits

## Details
- **Branch**: chore/conventional-commits
- **Type**: chore
- **Created**: 2025-12-27
- **Status**: in-progress

## Goal
Adopt conventional commits specification for this project to enable:
- Consistent commit message format
- Automated changelog generation
- Semantic version bumping based on commit types

## Context
The project already has `.claude/context/conventional_commits.md` with the full spec reference.
Need to integrate this into the development workflow.

## Session Log
- 2025-12-27: Session created, branch created from origin/main
- 2025-12-27: Created compact rule `.claude/rules/conventional-commits.md`
  - Format: `<type>[(scope)][!]: #N <description>` with bullet list body
  - Issue number required in first line, or use `chore` type for non-issue work
  - Marked as BLOCKING REQUIREMENT with MANDATORY-REREAD before commits
- 2025-12-27: Updated `.claude/config.json` onus commitFormat
  - Changed `{verb}` → `{type}` for direct mapping to conventional commits terminology
  - Added spec URL for reference
- 2025-12-27: Added spec URL to rule file
- 2025-12-27: Committed and created PR #5

## Next Steps
1. Merge PR #5
2. Consider whether `.claude/context/conventional_commits.md` should be tracked
