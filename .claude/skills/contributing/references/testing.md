# Test & Verify TEDI React Component

Target: `$ARGUMENTS`

## Workflow

### 1. Run Tests

If a component name or path was provided:
```
npm test -- --testPathPattern="$ARGUMENTS"
```

If no argument was provided, run the full test suite:
```
npm test
```

### 2. Analyze Failures

If tests fail:
- Read the failing test file and the component source.
- Identify the root cause — is it a test issue or a component bug?
- Fix the issue in the appropriate file.
- Re-run the failing test to confirm the fix.

### 3. Run Lint

```
npm run lint
```

### 4. Fix Lint Errors

If lint reports errors:
- Fix each reported issue in the source file.
- Re-run lint to confirm all errors are resolved.

### 5. Report

Summarize what was run and the outcome:
- Tests: pass/fail count
- Lint: clean or what was fixed
- Any issues that need manual attention
