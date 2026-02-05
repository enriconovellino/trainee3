import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface Aluno {
    id: number;
    nome: string;
    curso: string;
    idade: number;
    ativo: boolean;
}

interface AlunoBody {
    nome: string;
    curso: string;
    idade: number;
    ativo: boolean;
}

interface AlunoParams {
    id: string;
}

const fastify: FastifyInstance = Fastify({ logger: true });

let alunos: Aluno[] = [
    { id: 1, nome: "Ana Silva", curso: "Ciência da Computação", idade: 20, ativo: true },
    { id: 2, nome: "Bruno Souza", curso: "Engenharia Civil", idade: 22, ativo: false },
    { id: 3, nome: "Carla Dias", curso: "Design Digital", idade: 21, ativo: true }
];

fastify.get('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    return alunos;
});

fastify.get<{ Params: AlunoParams }>('/alunos/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno){ 
        return reply.code(404).send({ error: 'Aluno não encontrado' });
    }
    return aluno;
});

fastify.post<{ Body: AlunoBody }>('/alunos', async (request, reply) => {
    const { nome, curso, idade, ativo } = request.body;
    const novoId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;

    const novoAluno: Aluno = {
        id: novoId, 
        nome, 
        curso, 
        idade, 
        ativo 
    };

    alunos.push(novoAluno);
    return reply.code(201).send(novoAluno);
});

fastify.put<{ Params: AlunoParams; Body: AlunoBody }>('/alunos/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) {
        return reply.code(404).send({ error: 'Aluno não encontrado' });
    }
    alunos[index] = { ...alunos[index], ...request.body, id };
    return alunos[index];
});

fastify.delete<{ Params: AlunoParams }>('/alunos/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) {
        return reply.code(404).send({ error: 'Aluno não encontrado' });
    }
    alunos.splice(index, 1);
    return reply.code(204).send();
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Servidor rodando na porta 3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();