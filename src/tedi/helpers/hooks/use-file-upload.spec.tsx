import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { useFileUpload } from './use-file-upload';

import '@testing-library/jest-dom';

jest.mock('../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));

const oversizedFile = (name: string): File => new File(['a'.repeat(2000)], name, { type: 'image/jpeg' });
const makeFile = (name: string, type: string): File => new File(['x'], name, { type });
const changeEvent = (files: File[]): React.ChangeEvent<HTMLInputElement> =>
  ({ target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>);

describe('useFileUpload — accept matching', () => {
  it('accepts files matching a group wildcard (`image/*`), not just exact MIME types', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFileUpload({ accept: 'image/*', onChange }));

    act(() => result.current.onFileChange(changeEvent([makeFile('photo.png', 'image/png')])));

    expect(onChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'photo.png', isValid: true })]);
  });

  it('accepts any file under a universal wildcard (`*/*`)', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFileUpload({ accept: '*/*', onChange }));

    act(() => result.current.onFileChange(changeEvent([makeFile('data.bin', 'application/octet-stream')])));

    expect(onChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'data.bin', isValid: true })]);
  });

  it('rejects a file whose type is outside a group wildcard', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFileUpload({ accept: 'image/*', onChange }));

    act(() => result.current.onFileChange(changeEvent([makeFile('doc.pdf', 'application/pdf')])));

    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('keeps a rejected single file (marked invalid) when keepRejectedFiles is set, even without multiple', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFileUpload({ accept: 'image/*', keepRejectedFiles: true, onChange }));

    act(() => result.current.onFileChange(changeEvent([makeFile('doc.pdf', 'application/pdf')])));

    expect(onChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'doc.pdf', isValid: false })]);
    expect(result.current.innerFiles).toHaveLength(1);
    expect(result.current.errorHelper).toBeDefined();
  });
});

describe('useFileUpload — onFileRemove error clearing', () => {
  it('clears a batch rejection error when the last file is removed (empty field)', () => {
    const { result } = renderHook(() =>
      useFileUpload({ multiple: true, maxSize: 0.00001, defaultFiles: [{ name: 'ok.jpg', id: 'v1' }] })
    );

    act(() => result.current.onFileChange(changeEvent([oversizedFile('big.jpg')])));
    expect(result.current.errorHelper).toBeDefined();
    expect(result.current.innerFiles).toHaveLength(1);

    act(() => result.current.onFileRemove(result.current.innerFiles[0]));
    expect(result.current.innerFiles).toHaveLength(0);
    expect(result.current.errorHelper).toBeUndefined();
  });

  it('keeps the batch rejection error when an unrelated valid file is removed but others remain', () => {
    const { result } = renderHook(() =>
      useFileUpload({
        multiple: true,
        maxSize: 0.00001,
        defaultFiles: [
          { name: 'a.jpg', id: '1' },
          { name: 'b.jpg', id: '2' },
        ],
      })
    );

    act(() => result.current.onFileChange(changeEvent([oversizedFile('big.jpg')])));
    expect(result.current.errorHelper).toBeDefined();

    act(() => result.current.onFileRemove(result.current.innerFiles[0]));
    expect(result.current.innerFiles).toHaveLength(1);
    expect(result.current.errorHelper).toBeDefined();
  });
});
