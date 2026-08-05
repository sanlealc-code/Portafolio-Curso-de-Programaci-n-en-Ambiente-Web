import {INotification} from "../interfaces/Inotifciation";

export abstract class BaseNotification implements INotification {
    constructor(
        public readonly recipient: string,
        public readonly message: string
    ) {

    }

    protected lognotification(type: string): void {
        console.log(`log - ${new Date().toISOString()}] Iniciando envio de 
         ${type} a ${this.recipient}
        `);

    }

    abstract send(): void;

}