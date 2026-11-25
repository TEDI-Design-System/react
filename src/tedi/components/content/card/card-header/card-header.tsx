import cn from 'classnames';

import styles from '../card.module.scss';
import { CardContent, CardContentProps } from '../card-content/card-content';

export const CardHeader = (props: CardContentProps): JSX.Element => {
  const { className, backgroundColor = 'brand-primary', ...rest } = props;

  return (
    <CardContent className={cn(styles['tedi-card__header'], className)} backgroundColor={backgroundColor} {...rest} />
  );
};

export default CardHeader;
