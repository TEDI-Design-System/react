import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Col, Row } from '../../layout/grid';
import { ChoiceInputProps } from '../choice-input.types';
import FeedbackText from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './radio.module.scss';
import RadioGroup from './radio-group/radio-group';
import { RadioGroupContext } from './radio-group/radio-group-context';

export type RadioProps = BreakpointSupport<ChoiceInputProps>;

interface RadioComponent {
  (props: RadioProps): JSX.Element;
  Group: typeof RadioGroup;
  displayName?: string;
}

export const Radio = ((props: RadioProps): JSX.Element => {
  const group = React.useContext(RadioGroupContext);
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id,
    label,
    value,
    className,
    onChange,
    hideLabel,
    helper,
    checked,
    defaultChecked,
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
  } = getCurrentBreakpointProps<ChoiceInputProps>(props);

  const size = sizeProp ?? group?.size ?? 'default';
  const variant = variantProp ?? group?.variant ?? 'default';
  const cardVariant = cardVariantProp ?? group?.cardVariant ?? 'primary';
  const disabled = disabledProp ?? group?.disabled ?? false;
  const invalid = invalidProp ?? group?.invalid;
  const required = requiredProp ?? group?.required;

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;
  const resolvedName = name ?? group?.name;

  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  const isGrouped = group !== null;
  const getChecked = React.useMemo((): boolean => {
    if (isGrouped) return group?.value === value;
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [isGrouped, group, value, onChange, checked, innerChecked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (isGrouped) {
      group?.onValueChange(value);
    } else if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const helperId = helper ? helper.id ?? `${resolvedId}-helper` : undefined;
  const describedBy = helperId;

  const input = (
    <input
      id={resolvedId}
      value={value}
      name={resolvedName}
      type="radio"
      disabled={disabled}
      checked={getChecked}
      required={required}
      onChange={onChangeHandler}
      className={styles['tedi-radio__input']}
      aria-describedby={describedBy}
    />
  );

  const indicator = (
    <span
      aria-hidden="true"
      className={cn(
        styles['tedi-radio__indicator'],
        { [styles['tedi-radio__indicator--hover']]: hover },
        { [styles[`tedi-radio__indicator--size-${size}`]]: size },
        { [styles['tedi-radio__indicator--invalid']]: invalid }
      )}
      data-testid="radio-indicator"
    />
  );

  if (variant === 'card') {
    return (
      <label
        data-name="radio"
        className={cn(
          styles['tedi-radio'],
          styles['tedi-radio--card'],
          styles[`tedi-radio--card-${cardVariant}`],
          { [styles['tedi-radio--card-with-icon']]: !!icon },
          { [styles['tedi-radio--disabled']]: disabled },
          className
        )}
      >
        <span className={styles['tedi-radio__card-control']}>
          {input}
          {indicator}
          {icon && <Icon name={icon} size={size === 'default' ? 18 : 24} className={styles['tedi-radio__card-icon']} />}
          <span className={cn(styles['tedi-radio__card-label'], { 'sr-only': hideLabel })}>{label}</span>
        </span>
        {description && <span className={styles['tedi-radio__card-description']}>{description}</span>}
        {helper && (
          <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-radio__helper'], helper.className)} />
        )}
      </label>
    );
  }

  const LabelBEM = cn(styles['tedi-radio__label'], { [styles['tedi-radio--disabled']]: disabled });

  return (
    <div
      className={cn(styles['tedi-radio'], { [styles['tedi-radio--disabled']]: disabled })}
      data-name="radio"
      {...rest}
    >
      <Row gutter={0}>
        <Col width="auto">
          <div className={styles['tedi-radio__outer-indicator-wrapper']}>
            {input}
            {React.cloneElement(indicator, {
              onClick: () => labelRef.current?.click(),
              className: cn(indicator.props.className, className),
            })}
          </div>
        </Col>
        {label && (
          <Col>
            <FormLabel
              ref={labelRef}
              className={LabelBEM}
              id={resolvedId}
              data-testid="radio-label"
              hideLabel={hideLabel}
              label={label}
              tooltip={tooltip}
              required={required}
            />
          </Col>
        )}
      </Row>

      {helper && (
        <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-radio__helper'], helper.className)} />
      )}
    </div>
  );
}) as RadioComponent;

Radio.Group = RadioGroup;

Radio.displayName = 'Radio';

export { RadioGroup };
export type { RadioGroupProps } from './radio-group/radio-group';

export default Radio;
