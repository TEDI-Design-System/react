import { render } from '@testing-library/react';
import { run } from 'axe-core';

import FileDropzone, { toDropzoneAccept } from './file-dropzone';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));
jest.mock('../../../helpers/hooks/use-file-upload', () => ({
  useFileUpload: () => ({
    innerFiles: [],
    uploadErrorHelper: undefined,
    onFileChange: jest.fn(),
    onFileRemove: jest.fn(),
    announcement: '',
  }),
}));

describe('FileDropzone accept mapping (#783)', () => {
  const acceptAttr = (accept: string): string | null => {
    const { container } = render(<FileDropzone id="fd" name="file" label="Upload" accept={accept} multiple />);
    return container.querySelector<HTMLInputElement>('input[type="file"]')?.getAttribute('accept') ?? null;
  };

  it('renders the input accept attribute exactly equal to the prop (extensions)', () => {
    expect(acceptAttr('.pdf,.txt')).toBe('.pdf,.txt');
  });

  it('renders the input accept attribute exactly equal to the prop (MIME types)', () => {
    expect(acceptAttr('image/png,image/jpeg')).toBe('image/png,image/jpeg');
  });

  it('no longer leaks the hardcoded application/* wildcard', () => {
    expect(acceptAttr('.pdf,.txt')).not.toContain('application/*');
  });

  describe('toDropzoneAccept', () => {
    it('groups extensions under a filtered-out */* key and keeps MIME types as keys', () => {
      expect(toDropzoneAccept('.pdf,.txt')).toEqual({ '*/*': ['.pdf', '.txt'] });
      expect(toDropzoneAccept('image/png')).toEqual({ 'image/png': [] });
      expect(toDropzoneAccept('.pdf, image/png')).toEqual({ '*/*': ['.pdf'], 'image/png': [] });
    });

    it('returns undefined for missing/empty/whitespace-only accept', () => {
      expect(toDropzoneAccept(undefined)).toBeUndefined();
      expect(toDropzoneAccept('')).toBeUndefined();
      expect(toDropzoneAccept(' , ')).toBeUndefined();
    });
  });

  it('has no unnamed-input or nested-interactive a11y violations', async () => {
    const { container } = render(<FileDropzone id="fd" name="file" label="Upload files" accept=".pdf,.txt" multiple />);
    // The input is hidden via the SCSS-module class `.tedi-file-dropzone__input`, which jsdom
    // doesn't apply — inject the rule so axe evaluates the real (display:none) state.
    const style = document.createElement('style');
    style.textContent = '.tedi-file-dropzone__input { display: none; }';
    document.head.appendChild(style);
    const res = await run(container, { runOnly: ['label', 'nested-interactive', 'aria-hidden-focus'] });
    document.head.removeChild(style);
    expect(res.violations).toEqual([]);
  });
});
