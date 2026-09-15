import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Col, Row } from '../../layout/grid';
import { ChoiceInputProps } from '../choice-input.types';
import FeedbackText from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './checkbox.module.scss';
import { CheckboxGroupContext } from './checkbox-group/checkbox-group-context';

export type CheckboxBaseProps = ChoiceInputProps & {
  /**
   * If the check is in indeterminate state. (Not checked or unchecked)
   * When this is true then the checked prop is ignored
   */
  indeterminate?: boolean;
};

export type CheckboxProps = BreakpointSupport<CheckboxBaseProps>;

interface CheckboxComponent {
  (props: CheckboxProps): JSX.Element;
  displayName?: string;
}

export const Checkbox = ((props: CheckboxProps): JSX.Element => {
  const group = React.useContext(CheckboxGroupContext);
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id,
    label,
    value,
    className,
    onChange,
    hideLabel = false,
    helper,
    checked,
    defaultChecked,
    indeterminate,
    hover,
    name,
    tooltip,
    description,
    icon,
    size: sizeProp,
    variant: variantProp,
    cardVariant: cardVariantProp,
    disabled: disabledProp,
    invalid: invalidProp,
    required: requiredProp,
    ...rest
  } = getCurrentBreakpointProps<CheckboxBaseProps>(props);

  const size = sizeProp ?? group?.size ?? 'default';
  const variant = variantProp ?? group?.variant ?? 'default';
  const cardVariant = cardVariantProp ?? group?.cardVariant ?? 'primary';

  if (variant === 'card' && !!tooltip) {
    console.warn('Checkbox: `tooltip` is not supported with `variant="card"` and will be ignored. Use `description`.');
  }
  const disabled = disabledProp ?? group?.disabled ?? false;
  const invalid = invalidProp ?? group?.invalid;
  const required = requiredProp;

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;
  const resolvedName = name ?? group?.name;

  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);
  const labelRef = React.useRef<HTMLLabelElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isGrouped = group !== null;

  const getChecked = React.useMemo((): boolean | 'mixed' => {
    if (indeterminate) return 'mixed';
    if (isGrouped) return !!group?.values.includes(value);
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [indeterminate, isGrouped, group, value, onChange, checked, innerChecked]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate, getChecked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (isGrouped) {
      group?.onToggle(value, event.target.checked);
    } else if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const helperId = helper ? helper.id ?? `${resolvedId}-helper` : undefined;
  const describedBy = helperId;

  const input = (
    <input
      ref={inputRef}
      id={resolvedId}
      value={value}
      name={resolvedName}
      type="checkbox"
      disabled={disabled}
      checked={getChecked !== 'mixed' ? getChecked : false}
      required={required}
      aria-invalid={invalidProp || undefined}
      onChange={onChangeHandler}
      className={styles['tedi-checkbox__input']}
      aria-describedby={describedBy}
    />
  );

  const renderIndicator = (extraClassName?: string, onClick?: () => void) => (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={cn(
        styles['tedi-checkbox__indicator'],
        {
          [styles['tedi-checkbox__indicator--hover']]: hover,
          [styles['tedi-checkbox__indicator--indeterminate']]: indeterminate,
          [styles[`tedi-checkbox__indicator--size-${size}`]]: size,
          [styles['tedi-checkbox__indicator--invalid']]: invalid,
        },
        extraClassName
      )}
      data-testid="checkbox-indicator"
    >
      <Icon
        size={size === 'default' ? 16 : 18}
        name="remove"
        className={cn(styles['tedi-checkbox__icon'], styles['tedi-checkbox__icon--indeterminate'])}
      />
      <Icon
        size={size === 'default' ? 16 : 18}
        name="check"
        className={cn(styles['tedi-checkbox__icon'], styles['tedi-checkbox__icon--check'])}
      />
    </div>
  );

  if (variant === 'card') {
    // The whole card is a <label> for click convenience, but that would fold the
    // description and helper text into the control's accessible NAME. Name the
    // input from the choice text only (aria-labelledby), and expose the
    // description + helper as its accessible DESCRIPTION (aria-describedby).
    const cardLabelId = `${resolvedId}-label`;
    const cardDescriptionId = description ? `${resolvedId}-description` : undefined;
    const cardDescribedBy = [cardDescriptionId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <label
        data-name="check"
        className={cn(
          styles['tedi-checkbox'],
          styles['tedi-checkbox--card'],
          styles[`tedi-checkbox--card-${cardVariant}`],
          { [styles['tedi-checkbox--card-with-icon']]: !!icon },
          { [styles['tedi-checkbox--disabled']]: disabled },
          className
        )}
        {...rest}
      >
        <span className={styles['tedi-checkbox__card-control']}>
          {React.cloneElement(input, {
            'aria-labelledby': label ? cardLabelId : undefined,
            'aria-describedby': cardDescribedBy,
          })}
          {renderIndicator()}
          {icon && (
            <Icon name={icon} size={size === 'default' ? 18 : 24} className={styles['tedi-checkbox__card-icon']} />
          )}
          <span id={cardLabelId} className={cn(styles['tedi-checkbox__card-label'], { 'sr-only': hideLabel })}>
            {label}
          </span>
        </span>
        {description && (
          <span id={cardDescriptionId} className={styles['tedi-checkbox__card-description']}>
            {description}
          </span>
        )}
        {helper && (
          <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-checkbox__helper'], helper.className)} />
        )}
      </label>
    );
  }

  const LabelBEM = cn(styles['tedi-checkbox__label'], { [styles['tedi-checkbox--disabled']]: disabled });

  return (
    <div
      className={cn(styles['tedi-checkbox'], { [styles['tedi-checkbox--disabled']]: disabled })}
      data-name="check"
      {...rest}
    >
      <Row gutter={0}>
        <Col width="auto">
          <div className={styles['tedi-checkbox__outer-indicator-wrapper']}>
            {input}
            {renderIndicator(className, () => labelRef.current?.click())}
          </div>
        </Col>
        {label && (
          <Col>
            <FormLabel
              ref={labelRef}
              className={LabelBEM}
              id={resolvedId}
              data-testid="checkbox-label"
              hideLabel={hideLabel}
              label={label}
              tooltip={tooltip}
              required={required}
            />
          </Col>
        )}
      </Row>
      {helper && (
        <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-checkbox__helper'], helper.className)} />
      )}
    </div>
  );
}) as CheckboxComponent;

Checkbox.displayName = 'Checkbox';

export default Checkbox;
