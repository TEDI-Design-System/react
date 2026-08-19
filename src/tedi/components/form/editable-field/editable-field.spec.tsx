import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { TextField } from '../textfield/textfield';
import { EditableField } from './editable-field';

import '@testing-library/jest-dom';

const TextEditor = (props: Partial<React.ComponentProps<typeof EditableField<string>>> & { outside?: boolean }) => {
  const [value, setValue] = useState('John Mets');
  return (
    <>
      <EditableField<string>
        label="Name"
        value={props.value ?? value}
        onChange={props.onChange ?? setValue}
        renderValue={(v) => v || '—'}
        {...props}
      >
        {({ value: draft, onChange }) => (
          <TextField id="name-edit" label="Name" hideLabel value={draft} onChange={onChange} />
        )}
      </EditableField>
      {props.outside && <button type="button">outside</button>}
    </>
  );
};

describe('EditableField', () => {
  it('shows the value as a read trigger by default', () => {
    render(<TextEditor />);
    const trigger = screen.getByRole('button', { name: /name/i });
    expect(trigger).toHaveTextContent('John Mets');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('the trigger accessible name includes the label', () => {
    render(<TextEditor />);
    expect(screen.getByRole('button', { name: /name/i })).toHaveAccessibleName(/name/i);
  });

  it('enters edit mode on click and focuses the control', async () => {
    const user = userEvent.setup();
    render(<TextEditor />);
    await user.click(screen.getByRole('button', { name: /name/i }));

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('commits the draft when focus leaves the editor', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<TextEditor onChange={onChange} outside />);

    await user.click(screen.getByRole('button', { name: /name/i }));
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Mari Maasikas');

    await user.click(screen.getByRole('button', { name: 'outside' }));

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('Mari Maasikas'));
    await waitFor(() => expect(screen.queryByRole('textbox')).not.toBeInTheDocument());
  });

  it('cancels on Escape without committing', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<TextEditor onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /name/i }));
    await user.type(screen.getByRole('textbox'), 'xyz');
    await user.keyboard('{Escape}');

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /name/i })).toHaveTextContent('John Mets');
  });

  it('supports uncontrolled use via defaultValue', async () => {
    const user = userEvent.setup();
    render(
      <>
        <EditableField<string> label="Name" defaultValue="Kalle" renderValue={(v) => v || '—'}>
          {({ value, onChange }) => <TextField id="u" label="Name" hideLabel value={value} onChange={onChange} />}
        </EditableField>
        <button type="button">outside</button>
      </>
    );

    expect(screen.getByRole('button', { name: /name/i })).toHaveTextContent('Kalle');
    await user.click(screen.getByRole('button', { name: /name/i }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Tõnu');
    await user.click(screen.getByRole('button', { name: 'outside' }));

    await waitFor(() => expect(screen.getByRole('button', { name: /name/i })).toHaveTextContent('Tõnu'));
  });

  it('renders the placeholder when the value is empty', () => {
    render(
      <EditableField<string> label="Name" value="" renderValue={(v) => v} placeholder="Add name">
        {({ value, onChange }) => <TextField id="e" label="Name" hideLabel value={value} onChange={onChange} />}
      </EditableField>
    );
    expect(screen.getByRole('button', { name: /name/i })).toHaveTextContent('Add name');
  });

  it('commit() uses the latest draft when called right after onChange (commit-on-change controls)', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    const CommitOnChange = () => {
      const [v, setV] = useState('off');
      return (
        <EditableField<string>
          label="State"
          value={v}
          onChange={(next) => {
            setV(next);
            onChange(next);
          }}
          renderValue={(x) => x}
        >
          {({ onChange: setDraft, commit }) => (
            <button
              type="button"
              onClick={() => {
                setDraft('on');
                commit();
              }}
            >
              flip
            </button>
          )}
        </EditableField>
      );
    };
    render(<CommitOnChange />);

    await user.click(screen.getByRole('button', { name: /state/i }));
    await user.click(screen.getByRole('button', { name: 'flip' }));

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('on'));
    expect(screen.getByRole('button', { name: /state/i })).toHaveTextContent('on');
  });

  it('keeps editing (no commit) when focus moves into a floating-ui popover the editor opened', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <>
        <EditableField<string> label="Date" value="x" onChange={onChange} renderValue={(v) => v}>
          {({ value, onChange: setDraft }) => (
            <input aria-label="Date" value={value} onChange={(e) => setDraft(e.target.value)} />
          )}
        </EditableField>
        <div data-floating-ui-portal>
          <button type="button">day</button>
        </div>
      </>
    );

    await user.click(screen.getByRole('button', { name: /date/i }));
    screen.getByLabelText('Date').focus();
    await user.click(screen.getByRole('button', { name: 'day' }));
    await waitFor(() => expect(screen.getByLabelText('Date')).toBeInTheDocument());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders static text (no button) when disabled', () => {
    render(
      <EditableField<string> label="Name" value="Locked" disabled>
        {({ value, onChange }) => <TextField id="d" label="Name" hideLabel value={value} onChange={onChange} />}
      </EditableField>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Locked')).toBeInTheDocument();
  });
});
