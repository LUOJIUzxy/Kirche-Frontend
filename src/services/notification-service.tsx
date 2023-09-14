import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPE } from 'react-notifications-component/dist/src/typings';
import { NotificationType } from '../enum/notification-type-enum';
// import 'react-notifications-component/dist/theme.css';
// import 'animate.css';

export const NotificationService = (
  title: string,
  type: NotificationType,
  message: string
) => {
  Store.addNotification({
    title: title,
    message: message,
    // type: success, warning, info, default
    type: type as NOTIFICATION_TYPE,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      // onScreen: true
    },
  });
};
