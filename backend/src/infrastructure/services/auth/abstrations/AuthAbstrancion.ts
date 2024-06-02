export default interface AuthAbstraction {  
    login(email: string, pwd: string, useragent: string): Promise<string>;    
}