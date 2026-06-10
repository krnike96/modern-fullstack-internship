// we will display all added items and their price
// calculte the total price

import { CartContext } from "../context/CartContext";

export default function Cart() {
    const {cart} = React.useContext(CartContext);

    // calculate the total price of the added items from the cart
    const totalPrice = cart.reduce((accum, product) => {
        return accum + product.price;
    })

    return (
        <div>
            {
                cart && cart.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name} - ${item.price}</h3>
                        <br />
                    </div>
                ))
            }
            <hr />
            <h3>Total Price : ${totalPrice}</h3>
        </div>
    )
}

//react router dom :github repo

/*
    build a mini project using context api and api routes in nextjs 
    and also integrate prisma and graphQL
*/