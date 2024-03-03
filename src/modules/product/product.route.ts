import { FastifyInstance } from "fastify";
import { createProductHandler, getProductHandler } from "./product.controller";
import { $ref } from "./product.schema";


async function productRoutes(server: FastifyInstance) {

    server.post('/', {
        preHandler: [server.auth],
        schema: {
            body: $ref('createProductSchema'),
            response: {
                201: $ref('productResponseSchema')
            }
        }
    }, createProductHandler);

    // fetches all products -> to-do: single fetch
    server.get('/', { preHandler: [server.auth] }, getProductHandler);

};

export default productRoutes;