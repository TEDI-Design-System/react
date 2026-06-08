import { createContext } from 'react';

import { Breakpoint } from '../../../helpers';

export interface FooterContextValue {
  /**
   * Viewport breakpoint at and below which every Footer subcomponent
   * (`Footer.Body`, `Footer.Bottom`, `Footer.Side`, `Footer.Section`)
   * switches to its stacked mobile layout — accordion sections, stacked
   * sides, wrapped bottom strip.
   *
   * Set on `<Footer mobileBreakpoint="…">`. Subcomponents read from this
   * context so all five sites agree on the threshold; without it they'd
   * each hardcode their own value and drift apart on intermediate
   * viewports (e.g. tablet 600–760px).
   */
  mobileBreakpoint: Breakpoint;
  /**
   * Optional cap for the inner content width (the column row and the bottom
   * strip's content), centered inside the full-bleed backgrounds. Set on
   * `<Footer maxWidth="…">`; subcomponents read it so the body row and the
   * bottom strip align to the same width.
   */
  maxWidth?: number | string;
}

export const FooterContext = createContext<FooterContextValue>({
  mobileBreakpoint: 'sm',
});
