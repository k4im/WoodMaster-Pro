export default interface IJwtService { 
    decodeJwt(token: string): Promise<string>;
    isExpire(token: string): Promise<boolean>;
    encodeJwt(data: any): Promise<string>;
}