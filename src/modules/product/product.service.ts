import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    // need to add which user created the product 

    const product = await prisma.product.create({
        data,
    });
    return product;
};

export async function findProducts() {
    return prisma.product.findMany({
        select: {
            title: true,
            price: true,
            content: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    })
};