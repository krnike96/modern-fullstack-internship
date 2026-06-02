"use server";
import { pool } from "../lib/db";

export async function getMenuItems() {
  const res = await pool.query("SELECT item_id, item_name, price, category FROM menu_items");
  return res.rows;
}

export async function loginUser(email: string, password: string) {
  const res = await pool.query(
    "SELECT cust_id, name, email FROM customers WHERE email = $1 AND password = $2",
    [email, password]
  );
  return res.rows[0] || null;
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await pool.query(
    "INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING cust_id, name, email",
    [name, email, password]
  );
  return res.rows[0];
}

export async function createOrder(cust_id: number, items: { item_id: number; quantity: number }[], total: number) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const orderRes = await client.query(
      "INSERT INTO orders (total, cust_id) VALUES ($1, $2) RETURNING order_id",
      [total, cust_id]
    );
    const orderId = orderRes.rows[0].order_id;
    for (const item of items) {
      await client.query(
        "INSERT INTO order_items (order_id, item_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.item_id, item.quantity]
      );
    }
    await client.query("COMMIT");
    return { success: true, orderId };
  } catch (err) {
    await client.query("ROLLBACK");
    return { success: false, error: String(err) };
  } finally {
    client.release();
  }
}