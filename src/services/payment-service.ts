import http from '../utils/http';
import {ENDPOINT} from '../constants/api';
import {AxiosResponse, AxiosError} from 'axios';
import {NotificationService} from './notification-service';
import {NotificationType} from '../enum/notifcation-type-enum';

const PaymentLink = ENDPOINT.STRIPE;


const PaymentService = {

    getPaymentLink: async () => {
        try {
            const response: AxiosResponse = await http.get(PaymentLink.LINK);
            if (response && response.data) {
                for (const key in response.data) {
                    if (!response.data[key])
                        response.data[key] = '';
                }
                return response.data;
            }
        } catch (error) {
            if (error instanceof AxiosError)
                NotificationService('Payment Service Error', NotificationType.DANGER, error.response?.data.message);
            return null;
        }
    },

};

export default PaymentService;