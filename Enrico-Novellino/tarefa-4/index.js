const fastify = require('fastify')({ logger: true });

let alunos = [
    {
        id: 1, nome: "Ana Silva",
        curso: "Ciência da Computação", 
        idade: 20, 
        ativo: true 
    },
    {
        id: 2,
        nome: "Bruno Souza", 
        curso: "Engenharia Civil", 
        idade: 22, 
        ativo: false 
    },
    {
        id: 3, 
        nome: "Carla Dias", 
        curso: "Design Digital", 
        idade: 21, 
        ativo: true 
    }
];

fastify.get('/alunos', async (request, reply) => {
  return alunos;
});

fastify.get('/alunos/:id', async (request, reply) => {
  const id = parseInt(request.params.id);
  const aluno = alunos.find(a => a.id === id);
  
  return aluno;
});

fastify.post('/alunos', async (request, reply) => {
  const { nome, curso, idade, ativo } = request.body;
  
  const novoId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
  
  const novoAluno = { 
        id: novoId, 
        nome, 
        curso, 
        idade, 
        ativo 
    };
  alunos.push(novoAluno);
});

fastify.put('/alunos/:id', async (request, reply) => {
  const id = parseInt(request.params.id);
  const index = alunos.findIndex(a => a.id === id);

  alunos[index] = { ...alunos[index], ...request.body, id };
  
  return alunos[index];
});

fastify.delete('/alunos/:id', async (request, reply) => {
  const id = parseInt(request.params.id);
  const index = alunos.findIndex(a => a.id === id);

  alunos.splice(index, 1);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();