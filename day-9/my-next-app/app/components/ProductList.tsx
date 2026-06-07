"use client"
import React from 'react';
import { Product, storeProducts, getAllProductsFromDB } from '../actions/storeProducts';

function ProductList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  async function getAllProducts(){
    const res = await fetch("https://fakestoreapi.com/products");

    const data = await res.json();
    storeProducts(data);
    const output: any = await getAllProductsFromDB();
    
    setProducts(output);
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {
        products.map((prod) => (
          <div key={prod.id}>
            <h4>Title : {prod.prod_name}</h4>
            <h4>Price : {prod.price}</h4>
            <hr />
          </div>
        ))
      }
    </div>
  )
}

export default ProductList

// async function ProductList(){

// }

// export default ProductList;
