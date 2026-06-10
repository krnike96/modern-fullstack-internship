import { createContext, useState } from "react";

export const CounterContext = createContext<any>(null);

export const CounterProvider = ({ children }: any) => {
    const [count, setCount] = useState(0);

    return (
        <CounterContext.Provider value={{ count, setCount }}>
            {children}
        </CounterContext.Provider>
    );
}


/*
    a product page: use context API
    - with product cards -> productname & price 
    - place add to cart button on each card
    - a cart array 
    - display total price + all items name
*/