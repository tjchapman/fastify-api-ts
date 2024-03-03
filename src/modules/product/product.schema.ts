import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// properties inputted by the user
const productInput = {
    title: z.string({
        required_error: "Title is required"
    }),
    content: z.string().optional(),
    price: z.number({
        required_error: "Price is required"
    }),
};

// properties that are auto gen
const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
};

const createProductSchema = z.object({
    ...productInput,
});

const productResponseSchema = z.object({
    ...productInput,
    ...productGenerated
});


// plural products
const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema
}, { $id: "productSchema" });