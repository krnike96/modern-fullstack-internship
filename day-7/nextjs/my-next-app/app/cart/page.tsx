"use client";
import { useEffect, useState } from "react";
import { createOrder } from "../actions/dbActions";
import Link from "next/link";

type CartItem = {
  item_id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  function updateCart(newCart: CartItem[]) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function changeQty(id: number, delta: number) {
    const newCart = cart
      .map((item) =>
        item.item_id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(newCart);
  }

  function removeItem(id: number) {
    updateCart(cart.filter((item) => item.item_id !== id));
  }

  async function checkout() {
    if (!user) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }
    if (cart.length === 0) return;
    const itemsForDb = cart.map(({ item_id, quantity }) => ({ item_id, quantity }));
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const result = await createOrder(user.cust_id, itemsForDb, total);
    if (result.success) {
      alert("Order placed!");
      updateCart([]);
    } else {
      alert("Checkout failed: " + result.error);
    }
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) return <p>Cart is empty. <Link href="/">Go to menu</Link></p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.item_id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <b>{item.name}</b> - ${item.price} x {item.quantity}
          <button onClick={() => changeQty(item.item_id, -1)}>-</button>
          <button onClick={() => changeQty(item.item_id, 1)}>+</button>
          <button onClick={() => removeItem(item.item_id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}