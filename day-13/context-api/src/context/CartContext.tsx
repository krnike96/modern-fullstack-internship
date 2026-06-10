
import React from "react";

// create the cart context
export const CartContext = React.createContext<any>(null);

// create the CartContextProvider - CartProvider
export const CartProvider = ({children}:any) => {
    const [cart, setCart] = React.useState([]);
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

// wrap the entire App component inside CartProvider