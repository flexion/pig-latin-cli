---
# Conventional Commits - Compact Reference
companion: conventional_commits.md
spec: https://www.conventionalcommits.org/en/v1.0.0/

MANDATORY-REREAD: before-commit (use-thinking-block)

## FORMAT (BLOCKING REQUIREMENT)
structure: |
  <type>[(scope)][!]: #N <description>

  - change 1
  - change 2
type: required (feat, fix, docs, style, refactor, perf, test, build, ci, chore)
must-include: issue-number (#N) in first line | chore type (for non-issue work)
scope: optional (noun in parens, e.g., feat(parser):)
description: required (imperative present tense)
body: unnumbered list of changes (blank line after description)

## TYPES → SEMVER
fix: PATCH (bug fix)
feat: MINOR (new feature)
breaking: MAJOR (! after type/scope | BREAKING CHANGE: footer)
stable-release: 1.0.0 (!! after type/scope | INITIAL STABLE RELEASE: footer)
other: no semver effect (docs, style, refactor, perf, test, build, ci, chore)

## BREAKING CHANGES
indicate: ! before colon | BREAKING CHANGE: footer
uppercase: BREAKING CHANGE, INITIAL STABLE RELEASE (must be uppercase)

## EXAMPLES
simple: "docs: #15 update API documentation"
scoped: "feat(lang): #8 add polish language"
with-body: |
  fix: #42 resolve parsing bug

  - handle empty input gracefully
  - add null check for optional params
chore: "chore: update dependencies"
breaking: |
  feat!: #99 redesign authentication API

  - remove legacy token format
  - add JWT support
  - update all auth endpoints

  BREAKING CHANGE: old tokens no longer valid
full-example: |
  feat(auth): #123 add OAuth2 login support

  - implement Google OAuth provider
  - implement GitHub OAuth provider
  - update user model for provider tokens
  - add OAuth callback routes

## BEST PRACTICES
multi-type-changes: split into multiple commits
case: be consistent (lowercase recommended)
revert: use revert type with Refs: footer
---
