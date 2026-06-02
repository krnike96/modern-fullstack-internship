"use client"
import { useState } from 'react';
import {foods, FOOD} from "./food_items";

function Search() {
    const [input, setInput] = useState("");
    const [finalSearch, setFinalSearch] = useState("");
    const [category, setCategory] = useState("");

    function handleSearch() {
        setFinalSearch(input);
    }

    const filtered_list = finalSearch === "" ? [] : foods.filter((food: FOOD) => {
        return food.name.toLowerCase().includes(finalSearch.toLowerCase());
    });

    return (
        <div>
            <h1>Search Item</h1>
            <label htmlFor="search-item">Search: </label>
            <input type="text"
                id='search-item'
                placeholder='Enter Keyword'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br /><br />
            <button onClick={handleSearch}>Search</button>
            <h2>Filtered Food List</h2>
            {
                filtered_list.map((food: FOOD) => (
                    <div key={food.id}>
                        <h4>Food : {food.name}</h4>
                        <h4>Price : ${food.price}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default Search
