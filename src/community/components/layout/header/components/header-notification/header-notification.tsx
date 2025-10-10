import React from 'react';

import { Col, Row } from '../../../../../../tedi/components/layout/grid';
import Print from '../../../../../../tedi/components/misc/print/print';
import { Card, CardContent, CardProps } from '../../../../card';
import Icon from '../../../../icon/icon';
import styles from './header-notification.module.scss';

export interface HeaderNotificationProps {
  /**
   * Content of the notification
   */
  children?: React.ReactNode;
  /**
   * Name of material symbols icon
   * https://fonts.google.com/icons?icon.set=Material+Symbols
   * @default info
   */
  icon?: string;
  /**
   * Background color of card content
   * @default primary-highlight
   */
  background?: CardProps['background'];
}

export const HeaderNotification = (props: HeaderNotificationProps) => {
  const { children, icon = 'info', background = 'primary-highlight' } = props;

  return (
    <Print visibility="hide">
      <Card borderless background={background} borderRadius={false} className={styles['header-notification']}>
        <CardContent>
          <Row justifyContent="between" alignItems="center" gap={1} gutter={0}>
            <Col width="auto">
              <Icon name={icon} />
            </Col>
            <Col>{children}</Col>
          </Row>
        </CardContent>
      </Card>
    </Print>
  );
};

export default HeaderNotification;
