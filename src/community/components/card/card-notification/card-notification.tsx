import cn from 'classnames';

import Alert, { AlertProps } from '../../../../tedi/components/notifications/alert/alert';
import { warnDeprecated } from '../../../../tedi/helpers/warn-deprecated/warn-deprecated';
import CardContent, { CardContentProps } from '../card-content/card-content';
import style from './card-notification.module.scss';

export type CardNotificationProps = AlertProps & Pick<CardContentProps, 'padding'>;

/**
 * @deprecated Use `CardNotification` from `@tedi-design-system/react/tedi` instead.
 */
export const CardNotification = (props: CardNotificationProps): JSX.Element => {
  warnDeprecated('Community CardNotification', 'Use `CardNotification` from `@tedi-design-system/react/tedi` instead.');
  const { children, padding, className, ...rest } = props;

  const BEM = cn(style['card__notification'], className);

  return (
    <CardContent data-name="card-notification" padding={padding} className={style['card__notification-content']}>
      <Alert className={BEM} {...rest}>
        {children}
      </Alert>
    </CardContent>
  );
};

export default CardNotification;
