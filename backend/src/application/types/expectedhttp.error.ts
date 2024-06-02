import { HttpException, HttpStatus } from "@nestjs/common";

export default class ExpectedHttpError extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status)
        this.name = 'Expected HTTP Exception'
    }
}