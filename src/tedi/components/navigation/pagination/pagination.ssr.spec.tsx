/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';

import { Pagination } from './pagination';

describe('Pagination server rendering', () => {
  it('renders the page-size select where there is no document', () => {
    expect(typeof document).toBe('undefined');

    const html = renderToString(<Pagination pageCount={5} pageSizeOptions={[10, 20, 50]} pageSize={10} />);

    expect(html).toContain('tedi-pagination');
  });
});
