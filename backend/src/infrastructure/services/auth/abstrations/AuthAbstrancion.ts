export default interface AuthAbstraction {  
    login(email: string, pwd: string): Promise<string>;    
}