import http from '../utils/http';
import {ENDPOINT} from '../constants/api';
import {AxiosResponse, AxiosError} from 'axios';
import {NotificationService} from './notification-service';
import {NotificationType} from '../enum/notifcation-type-enum';

const BasicInformationService = {
    getContact: async (): Promise<string | undefined> => {
        try {
            const response: AxiosResponse = await http.get(ENDPOINT.BASIC_INFORMATION.CONTACT);
            if (response && response.data) {
                return response.data;
            }
        } catch (error) {
            if (error instanceof AxiosError)
                NotificationService('Company Service Error', NotificationType.DANGER, error.response?.data.message);
        }
    },
    updateContact: async (newContact: string): Promise<string | undefined> => {
        try {
            const response: AxiosResponse = await http.post(ENDPOINT.BASIC_INFORMATION.CONTACT + '/' + newContact);
            if (response) {
                for (const key in response.data) {
                    if (!response.data[key])
                        response.data[key] = '';
                }
                NotificationService('Congratulations!', NotificationType.SUCCESS, 'Updated Successfully!');
                console.log(response);
                return response.data.message;
            }
        } catch (error: unknown) {
            //You cannot write a specific annotation for the catch clause variable in Typescript.
            if (error instanceof AxiosError)
                NotificationService('Company Service Error', NotificationType.DANGER, error.response?.data.message);
        }

    },
};


export default BasicInformationService;