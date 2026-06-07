"use server"

import {prisma} from "@/lib/prisma";

export interface Product{
  id: number,
  prod_name: string,
  description: string,
  price: number
}

export async function storeProducts(products: Product[]){
for (const product of products) {
    await prisma.products.create({
        data: {
            prod_name: product.prod_name,
            description: product.description,
            price: product.price
        }
    });
    const prodFromDb = await prisma.products.findMany();
    console.log("Products: ", prodFromDb);
}
}

export async function getAllProductsFromDB(){
    const result = await prisma.products.findMany();
    return result;
}