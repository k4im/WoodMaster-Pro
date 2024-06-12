class EnvChecker  {

    checkEnv() { 
        if(!process.env.HOST) 
            throw Error("É necessário espeficicar a URL do banco de dados.")
        if(!process.env.PORT_DB)
          throw Error("É necessário espeficicar a porta de acesso ao banco de dados.")
        if(!process.env.USER_DB)
          throw Error("É necessário espeficicar o usuario do banco de dados.")
        if(!process.env.PWD_DB)
          throw Error("É necessário espeficicar a senha de acesso ao banco de dados.")
        if(!process.env.DB_NAME)
          throw Error('É necessário especificar o nome do banco')
        if(!process.env.PORT_APP) 
          throw Error("A porta do app precisa ser definida")
        if(!process.env.SECRET_KEY)
          throw Error('Secret key not informed.')      
    }
}

const envChecker = new EnvChecker();

export {envChecker}