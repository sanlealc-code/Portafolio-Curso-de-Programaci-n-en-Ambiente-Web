import { BaseNotification } from  "./BaseNotifications.ts";
export class SmsNotification extends BaseNotification {

    send(): void{
        this.lognotification("SMS");
        console.log(`Sending SMS to ${this.recipient}`); 
        console.log(`Message: ${this.message}`);


    }

}