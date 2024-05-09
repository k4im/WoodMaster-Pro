export default abstract class AuthAbstraction {  
    async login(email: string, pwd: string): Promise<string> {
        return
    };

    async extractPermissions(user: any): Promise<any>  {
        return 
    }

    async checkPassword(pwd: string, hash: string): Promise<boolean> {
        return
    }
}