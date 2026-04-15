#!/bin/bash
# Post-edit hook: finds and runs the nearest spec file when a component file is edited.
# Reads file path from stdin JSON (PostToolUse hook format).
# Exits 0 always — test failures are reported as output, not as hook failures.

INPUT=$(cat /dev/stdin)
ABSOLUTE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$ABSOLUTE_PATH" ]]; then
  exit 0
fi

# Convert absolute path to relative path from project root
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
if [[ -n "$CWD" ]]; then
  FILE="${ABSOLUTE_PATH#$CWD/}"
else
  FILE="$ABSOLUTE_PATH"
fi

# Only trigger for component source files in src/tedi/
if [[ ! "$FILE" =~ ^src/tedi/ ]]; then
  exit 0
fi

# Skip if the edited file is itself a spec or story
if [[ "$FILE" =~ \.(spec|stories)\. ]]; then
  exit 0
fi

# Derive the spec file path
if [[ "$FILE" =~ \.tsx$ ]]; then
  SPEC="${FILE%.tsx}.spec.tsx"
elif [[ "$FILE" =~ \.ts$ ]]; then
  SPEC="${FILE%.ts}.spec.ts"
elif [[ "$FILE" =~ \.module\.scss$ ]]; then
  # For SCSS modules, find the corresponding component spec
  DIR=$(dirname "$FILE")
  BASENAME=$(basename "$FILE" .module.scss)
  SPEC="$DIR/$BASENAME.spec.tsx"
fi

# Run test if spec file exists
if [[ -n "$SPEC" && -f "$SPEC" ]]; then
  echo "Running: npm test -- --testPathPattern=\"$SPEC\""
  npm test -- --testPathPattern="$SPEC" 2>&1
else
  echo "No spec file found at $SPEC — skipping auto-test."
fi
