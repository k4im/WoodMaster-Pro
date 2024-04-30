export class EmailException extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'EmailException';
        Object.setPrototypeOf(this, EmailException.prototype)
    }
}