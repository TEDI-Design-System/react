# Test & Verify TEDI React Component

Target: the component given in the task, or the whole suite.

## Workflow

### 1. Run Tests

For one component:
```
npm test -- --testPathPattern="<component-name>" --coverage=false
```

`--coverage=false` is required for a narrow run: coverage is on by default and measured against the
whole library, so a single-component run would always trip the 80% global threshold and exit 1.

For the whole suite:
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

## Patterns

### Basic Component Test
```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ComponentName', () => {
  it('renders with default properties', () => {
    render(<ComponentName id="test" label="Test" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Mocking Breakpoint Hook
```tsx
jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockReturnValue({
    getCurrentBreakpointProps: jest.fn((props) => props),
  });
});
```

### Testing Form Controls
```tsx
it('calls onChange when value changes', () => {
  const handleChange = jest.fn();
  render(<TextField id="test" label="Test" onChange={handleChange} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new' } });
  expect(handleChange).toHaveBeenCalledWith('new');
});

it('works in uncontrolled mode', () => {
  render(<TextField id="test" label="Test" defaultValue="initial" />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('initial');
  fireEvent.change(input, { target: { value: 'updated' } });
  expect(input).toHaveValue('updated');
});
```

### Testing Controlled vs Uncontrolled
```tsx
it('changes state when clicked if not controlled', async () => {
  const TestComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        id="test"
        label="Test"
        defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    );
  };

  render(<TestComponent />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  await act(async () => { fireEvent.click(checkbox); });
  expect(checkbox).toBeChecked();
});
```

### Query Priority
Use semantic queries in this order:
1. `getByRole` (preferred)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)
