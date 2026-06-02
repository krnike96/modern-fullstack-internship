'use client'
import React, { useState } from "react"
import { foods, FOOD } from "./food_items";

export default function Sort(){
    const [order, setOrder] = useState("low-high");

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
        setOrder(e.target.value);
    }
    
    const sorted_items = [...foods];
    
    if (order === "low-high") {
        sorted_items.sort((a: FOOD, b: FOOD) => a.price - b.price);
    } else if (order === "high-low") {
        sorted_items.sort((a: FOOD, b: FOOD) => b.price - a.price);
    }

    return (
        <>
            <h1>Sort Food Items By Price: </h1>
            <select 
              onChange={handleChange} 
              value={order}
            >
                <option value="low-high">Low - High</option>
                <option value="high-low">High - Low</option>
            </select>

            {
               sorted_items.map((food_item: FOOD) => (
                <div key={food_item.id}>
                    <h2>{food_item.name}</h2>
                    <h3>Price: {food_item.price}</h3>
                </div>
               ))
            }
        </>
    )
}

/*
  tables:
    customers: name, email, password, cust_id
    , orders: order_id, total, created_at, status, cust_id
    , restuarants: table ❌ api ✅
    , menu_items: item_id, item_name, price
    , order_items: order_id, item_id, quantity
    , category: cat_id, name,
*/