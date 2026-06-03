"use server";
import { prisma } from "../lib/prisma";

export async function getMenuItems() {
  const items = await prisma.menu_items.findMany({
    select: {
      item_id: true,
      item_name: true,
      price: true,
      category: true,
    },
  });
  return items.map(item => ({
    ...item,
    price: Number(item.price)
  }));
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.customers.findFirst({
    where: {
      email: email,
      password: password,
    },
    select: {
      cust_id: true,
      name: true,
      email: true,
    },
  });
  return user || null;
}

export async function registerUser(name: string, email: string, password: string) {
  try {
    const newUser = await prisma.customers.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        cust_id: true,
        name: true,
        email: true,
      },
    });
    return newUser;
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return null;
    }
    console.error("Registration error:", error);
    return null;
  }
}

export async function createOrder(cust_id: number, items: { item_id: number; quantity: number }[], total: number) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const order = await tx.order.create({
        data: {
          total: total,
          cust_id: cust_id,
          status: "pending",
        },
        select: {
          order_id: true,
        },
      });

      // 2. Create all order items
      await tx.orderItem.createMany({
        data: items.map((item) => ({
          order_id: order.order_id,
          item_id: item.item_id,
          quantity: item.quantity,
        })),
      });

      return order.order_id;
    });

    return { success: true, orderId: result };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, error: String(error) };
  }
}