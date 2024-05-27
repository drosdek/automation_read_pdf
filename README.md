# Requisitos
 - NodeJS
 - PostgreSQL
 - Docker

# Primeiros passos
1. **Rodar ambiente via docker** Abra o arquivo [docker-compose.yml](./.devcontainer/docker-compose.yml) e edite a linha 10, colocando o caminho do seu PATH local;
2. **Configure o banco de dados** Abra o arquivo [postgres.env](./.devcontainer/postgres.env) e subistua os valores conforme você desejar configurar seu banco de dados;
3. **Configure a conexão com o banco** Abra o arquivo [.env-example](./.env-example) renomeie o arquivo para .env e altere conforme sua configuração.
4. **Subindo o docker** Rode o comando `docker compose up -d` dentro do repositório `.devcontainer`
5. **Rodando migrations** Rode as migrations `npx prisma migrate dev --name init`
