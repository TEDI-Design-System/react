import cn from 'classnames';
import { ElementType, forwardRef, LabelHTMLAttributes, ReactNode } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import type { TextModifiers } from '../../base/typography/text/text';
import { InfoTooltip } from '../../overlays/tooltip/info-tooltip';
import styles from './label.module.scss';

/**
 * Subset of {@link TextModifiers} that is meaningful for a label. `.tedi-label` is
 * `display: inline`, so text-alignment (`center`/`left`/`right`) and `::first-letter`
 * (`capitalize-first`) have no effect and are intentionally excluded — only wrapping,
 * text-transform and italic controls that actually apply to inline text remain.
 */
export type LabelModifiers = Extract<
  TextModifiers,
  'nowrap' | 'break-all' | 'break-word' | 'break-spaces' | 'italic' | 'uppercase' | 'lowercase' | 'capitalize'
>;

/**
 * Breakpoint-aware `modifiers` for a label, so consumers can vary wrapping responsively
 * (e.g. `{ modifiers: 'nowrap', sm: { modifiers: 'break-word' } }`).
 */
export type LabelModifierProps = BreakpointSupport<{ modifiers?: LabelModifiers[] | LabelModifiers }>;

type LabelBreakpointProps = {
  /**
   * If true, applies a bold font weight to the label text.
   * @default false
   */
  isBold?: boolean;
  /**
   * If true, applies a small font size to the label text.
   * @default false
   */
  isSmall?: boolean;
  /**
   * Text modifiers that control how the label text is rendered, e.g. wrapping and
   * line-breaking behavior (`'nowrap'`, `'break-word'`, `'break-all'`, `'break-spaces'`).
   * Reuses the same modifiers as the `Text` component. Useful to prevent long labels
   * from breaking across multiple lines and distorting form layouts.
   */
  modifiers?: LabelModifiers[] | LabelModifiers;
};

export interface LabelProps
  extends BreakpointSupport<LabelBreakpointProps>,
    LabelHTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /**
   * The element type to render.
   * This can be any valid HTML element, allowing flexibility
   * in how the label is used. Defaults to 'label'.
   * @default 'label'
   */
  as?: ElementType;
  /**
   * If true, displays a required symbol (*) after the label text,
   * indicating that the associated input is mandatory.
   * @default false
   */
  required?: boolean;
  /**
   * Tooltip content to display when hovering over the info button. Accepts rich
   * content (e.g. bold text, links), not just a plain string.
   * If provided, an info button with a tooltip will be rendered.
   */
  tooltip?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement | HTMLSpanElement, LabelProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    as: Element = 'label',
    children,
    className,
    isBold,
    isSmall,
    modifiers,
    required,
    tooltip,
    ...rest
  } = getCurrentBreakpointProps<LabelProps>(props);

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const labelBEM = cn(
    styles['tedi-label'],
    isBold && styles['tedi-label--bold'],
    isSmall && styles['tedi-label--small'],
    modifiersArray?.map((modifier) => `text-${modifier}`),
    className
  );

  const labelElement = (
    <Element ref={ref} className={labelBEM} {...rest}>
      {children}
      {required && (
        <span className={styles['tedi-label__required']} aria-hidden="true">
          *
        </span>
      )}
    </Element>
  );

  if (!tooltip) {
    return labelElement;
  }

  return (
    <span className={styles['tedi-label__wrapper']}>
      {labelElement}
      <span className={styles['tedi-label__info']}>
        <InfoTooltip isSmall={isSmall}>{tooltip}</InfoTooltip>
      </span>
    </span>
  );
});

Label.displayName = 'Label';
