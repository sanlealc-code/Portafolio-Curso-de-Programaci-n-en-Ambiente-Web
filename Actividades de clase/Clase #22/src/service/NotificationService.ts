import {INotification} from "../interfaces/Inotifciation";

export class NotificationService {
    public processNotification(notifications: INotification[]): void {
        console.log("Analizyng notifications fot each blocks\n\n");

        for(const notification of notifications){
            notification.send();
        }
        console.log("Finished processing notifications for each blocks\n\n");
    }
}