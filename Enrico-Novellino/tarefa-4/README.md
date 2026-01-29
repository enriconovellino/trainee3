# API REST utilizando Fastify e CommonJS

Este projeto é uma API simples para gerenciamento de alunos, desenvolvida utilizando o framework **Fastify** com o padrão **CommonJS**.

## Passo a passo para rodar a API

### 1. Primeiro passo
Clone o repositório para sua máquina:

```bash
git clone https://github.com/enriconovellino/Enrico-Novellino.git
cd seu-repositorio
npm install
```

### 2. Segundo passo
Rode o arquivo index.js usando o comando:

```bash
node index.js
```

### 3. Terceiro passo
Com o servidor rodando, digite a URL no seu navegador para verificar o funcionamento: 
```bash
http://localhost:3000
```

### 4. Quarto passo
Aqui está uma lista das operações CRUD disponíveis para testar a API:

GET	/alunos -> Retorna a lista completa de alunos (return alunos).
GET	/alunos/:id -> Busca um aluno específico pelo ID.
POST /alunos - > Cadastra um novo aluno. Espera receber: nome, curso, idade, ativo.
PUT	/alunos/:id -> Atualiza os dados de um aluno existente.
DELETE /alunos/:id -> Remove um aluno da lista.