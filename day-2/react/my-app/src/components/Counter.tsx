import { useState, useEffect } from "react";
function Counter(){
    const [count, setCount] = useState(0);

    useEffect(() => {
    }, []);
    
    function handleIncreament(){
        setCount(count + 1);
    }

    function handleDecrement(){
        setCount(count - 1);
    }
    return(
        <>
        <div>{count}</div>
        <button onClick={handleIncreament}>Increament</button>
        <button onClick={handleDecrement}>Decrement</button>
        </>
    );
}

export default Counter;