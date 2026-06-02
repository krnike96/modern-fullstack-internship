"use client";
import { useEffect, useState } from "react";
import { getMenuItems } from "../actions/dbActions";

type FoodItem = {
  item_id: number;
  item_name: string;
  price: number;
  category: string;
};

export default function FoodCards() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [filtered, setFiltered] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("low-high");

  useEffect(() => {
    getMenuItems().then(setItems);
  }, []);

  useEffect(() => {
    let result = [...items];
    if (search) {
      result = result.filter(item =>
        item.item_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") {
      result = result.filter(item => item.category === category);
    }
    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }
    setFiltered(result);
  }, [items, search, category, sort]);

  const addToCart = (item: FoodItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.item_id === item.item_id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div>
      <h1>Our Menu (from database)</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {filtered.map(item => (
          <div key={item.item_id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h3>{item.item_name}</h3>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p>No items found.</p>}
    </div>
  );
}