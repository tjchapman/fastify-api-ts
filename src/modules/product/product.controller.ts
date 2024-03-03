import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "./product.schema";
import { createProduct, findProducts } from "./product.service";

export async function createProductHandler(
    request: FastifyRequest<{
        Body: CreateProductInput
    }>,
    reply: FastifyReply) {

    try {
        const product = await createProduct({
            ...request.body,
            ownerId: request.user.id,
        });

        return reply.code(201).send(product)
    } catch (e) {
        console.log(e)
        return reply.code(500).send(e);
    }
};

export async function getProductHandler() {
    const products = await findProducts();

    return products;
};

