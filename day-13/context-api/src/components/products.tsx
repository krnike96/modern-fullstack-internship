import React from "react";
import { CartContext } from "../context/CartContext"

const products = [
    {
        id:1,
        name: "Macbook Air M5",
        price: 1500
    },
    {
        id:2,
        name: "Iphone 17",
        price: 1100
    },
    {
        id:3,
        name: "Google Pixel 10 Pro XL",
        price: 1600
    },
    {
        id:4,
        name: "Samsung Galaxy S24 Ultra",
        price: 1900
    },
]

export default function Products(){
    const {cart, setCart} = React.useContext(CartContext);

    function addToCart(product){
        setCart([...cart, product]);
    }
    // display all products
    return (
        <div>
            {
                products.map((product) => (
                    <div key={product.id}>
                        <h3>Name : {product.name}</h3>
                        <h3>Price : {product.price}</h3>
                        <button onClick={addtoCart(product)}>Add</button>
                    </div>
                ))
            }
        </div>
    )
    // in front of each product -> diaplay addToCart button

}