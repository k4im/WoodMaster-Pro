export class TelefoneException extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'TelefoneException';
        Object.setPrototypeOf(this, TelefoneException.prototype)
    }
}