import { INotification } from "./interfaces/Inotifciation";
import { NotificationService } from "./service/NotificationService";
import {EmailNotification} from "./classes/EmailNotifications";
import {SmsNotification} from "./classes/SmsNotifications";


const 

const emailNotification = new EmailNotification(
  "prueba@.com",
  "Hello, this is a test email notification."
);

const smsNotification = new SmsNotification(
  "1234567890",
  "Hello, this is a test SMS notification."
);

const notifications: INotification[] = [emailNotification, smsNotification];
const notificationService = new NotificationService();
