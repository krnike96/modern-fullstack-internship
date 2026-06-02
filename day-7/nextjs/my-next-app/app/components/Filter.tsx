"use client"
import { useState } from 'react';
import { foods, FOOD } from "./food_items";

function Filter() {
    const [category, setCategory] = useState("All");

    const filtered_cat = foods.filter((food: FOOD) => {
        if(category === "All") 
            return true;
        return food.category === category;
    });


    function handleChange(e){
        setCategory(e.target.value);
    }

    return (
        <>
            <h1>Filtered food items</h1>
            <select 
                value={category}
                onChange={handleChange}    
            >
                <option value="All">All</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
            </select>
            <br /><br />
            {
                filtered_cat.map((food: FOOD) => (
                    <div key={food.id}>
                        <h4>{food.name}</h4>
                        <h4>{food.price}</h4>
                    </div>
                ))
            }
        </>
    )
}

export default Filter
