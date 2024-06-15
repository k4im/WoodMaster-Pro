
# WoodMaster

Backend para um sistema  multitenant para marcenarias.

O sistema estará sendo utilizado para efetuar a gestão dentro de uma marcenaria.

Sendo possivel efetuar a gestão de ordens de serviços, gestão de colaboradores de gestão de projetos.

Possuindo um sistema de controle de acesso utilizando `CASLJS` para estar efetuando o permissionamento dentro do sistema.

Possuindo um sistema de permissionamento baseando-se em papeis e permissões.


## Autor

- [@k4im](https://www.github.com/k4im)


## Variaveies de ambiente.

Para rodar este projeto é necessário ter as seguintes variaiveis de ambiente em seu arquivo `.env`.

`HOST` - Variavel utilizada para informar o host do banco de dados.

`PORT_DB` - Variavel para acesso a porta do banco

`USER_DB` - Variavel para informar o usuario de acesso ao banco.

`PWD_DB` - Variavel para informar a senha de acesso ao banco.

`DB_NAME` - Variavel para informar o nome do banco.

`PORT_APP` - Variavel para informar a porta de execução do app.

`SECRET_KEY` - Variavel para informar o secret utilizado o jwt.