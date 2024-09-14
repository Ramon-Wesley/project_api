# Aplicativo de Gerenciamento de Compras e Vendas

Este é um aplicativo Node.js para gerenciamento de compras e vendas, projetado com uma arquitetura limpa para facilitar a manutenção e a escalabilidade. O aplicativo utiliza Docker e Docker Compose para uma configuração fácil e rápida do ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o código JavaScript.
- **Express**: Framework para construir a API RESTful.
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Redis**: Armazenamento em cache e gerenciamento de filas.
- **BullMQ**: Biblioteca para gerenciamento de filas de tarefas.
- **Clean Architecture**: Estrutura de código baseada nos princípios da Clean Architecture para uma separação clara de responsabilidades e facilidade na manutenção.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estrutura do Projeto

- **src/**: Código-fonte do aplicativo.
- **docker-compose.yml**: Arquivo de configuração do Docker Compose.
- **Dockerfile**: Arquivo para construção da imagem Docker do aplicativo.
- **.env**: Arquivo de variáveis de ambiente (a ser criado).

## Configuração e Execução

### 1. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
PORT=3000
TYPE_ORM="sequelize"
DB_NAME="databaseapi"
DB_USERNAME="postgres"
DB_PASSWORD="admin"
DB_HOST="db_postgres"
DB= "postgres"
DB_STORAGE=":memory:"
DB_PORT=5432
CACHE="redis"
CACHE_EXP=
CACHE_PORT=6379 
QUEUE_TYPE='bullmq'
CACHE_HOST="localhost"
ENCRYPT="bcrypt"
JWT_SECRET= Adicione aqui um secret
JWT_EXPIRES=7d

### 1. Configurar as Variáveis de Ambiente

No terminal digite o seguinte comando docker-compose up --build
