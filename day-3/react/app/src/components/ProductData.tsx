import {useState, useEffect} from 'react';

interface Product{
    id: number,
    title: string,
    price: number,
    stock: number
}

function ProductData() {
  const [products, setProducts] = useState<Product[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState(null);
  
    //   function getProductsData() {
    //       fetch("https://dummyjson.com/products")
    //           .then((res) => {
    //               return res.json();
    //           })
    //           .then((data) => {
    //               setProducts(data.products);
    //               setIsLoading(!isLoading);
    //           })
    //           .catch((e) => {
    //               setError(e);
    //           });
    //   }

      async function getProductsData(){
        try{
            const res = await fetch("https://dummyjson.com/products");
            const data = await res.json();
            setProducts(data.products);
            setIsLoading(!isLoading);

        }catch(e){
            console.log(e);
        }
      }
  
      useEffect(() => {
          getProductsData();
      }, []);
  
      if(isLoading){
          return (
              <h1>Data is Loading...</h1>
          );
      }
  
      if(error){
          return (
              <h1>Error while fetching the data</h1>
          );
      }
      return (
          <div>
              <h1>Products Data</h1>
              {
                  products.map((product) => (
                      <div key={product.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                          <h2>Id: {product.id}</h2>
                          <h2>Title: {product.title}</h2>
                          <h2>Price: {product.price}</h2>
                          <h2>Stock: {product.stock}</h2>
                      </div>
                  )
                  )
              }
          </div>
      )
}

export default ProductData
