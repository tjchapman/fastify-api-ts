import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import '@fastify/jwt';
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import productRoutes from "./modules/product/product.route";
import { productSchemas } from "./modules/product/product.schema";
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import fastifySwaggerUi from "@fastify/swagger-ui";
import { version } from '../package.json';


export const server = Fastify();

const swaggerOptions = {
    swagger: {
        info: {
            title: 'Fastify-API',
            description: 'API for products with users and auth',
            version,
        },
    }
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

declare module "fastify" {
    export interface FastifyInstance {
        auth: any;
    }
}

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            "email": string,
            "name": string,
            "id": number
        }

    }
}

server.register(require('@fastify/jwt'), {
    secret: 'fndsSGy5WqDRKanqb5P1'
});

server.decorate("auth", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        return reply.send(e)
    }
})

server.get('/healthcheck', async function () {
    return { status: "OK" };
});

async function main() {

    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }

    server.register(fastifySwagger, swaggerOptions);
    server.register(fastifySwaggerUi, swaggerUiOptions);
    server.register(userRoutes, { prefix: '/api/users' });
    server.register(productRoutes, { prefix: 'api/products' });

    try {
        await server.listen(3000, '0.0.0.0')
        console.log(`Server ready at http://localhost:3000`);
    } catch (e) {
        console.error(e);
        process.exit(1); // exited with failure
    }
};

main();