export default class ExpectedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'Expected error.'
    }
}