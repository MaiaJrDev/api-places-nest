Node v21.6.2
Nestjs/TypeORM

- executar npm install para instalar as dependências
- executar npm run migration:run para executar as migrations
- npm run para rodar o projeto

Rotas

POST  /user/register => Criar um Usuario

payload : {
    "username": "Juca",
    "password": "12345"
}


POST  /user/auth => autenticar(obter token)

payload : {
    "username": "Juca",
    "password": "12345"
}

deve-se passar o token retornado no header como (Authorization: Bearer *****) para acessar as rotas


POST  /manager-places/create-place  => Criar um Lugar

payload: {
  "name": "lugar",
  "city": "por ai",
  "state": "DF"
}


GET  /manager-places/getAll  => Obter todos os lugares cadastrados

GET  /manager-places/search-places  => Filtrar Lugares
passar via query ?name=""&?city=""&?state=""
fazer combinações ou passar apenas um

PUT /manager-places/edit-place  => Editar um lugar
passar o id via query ?id=1

payload: {
  "name": "lugar",
  "city": "por ai",
  "state": "DF"
}

DELETE /manager-places/delete-place
passar o id via query ?id=1
