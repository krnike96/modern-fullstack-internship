"use client"
import { startTransition, useOptimistic } from "react";

const comments = [
    "hi there",
    "how are you?"
]

function OptimisticPage() {
    const [optimisticCommnents, addOptimistic] = useOptimistic(comments , 
        (state:string[], newValue:string) => {
            return [...state, newValue];
        });

    function handleClick(){
        startTransition(() => {
            addOptimistic("this is new comment");
        });
    }

  return (
    <div>
      <h1>User Comments: </h1>
      <br />
      <button onClick={handleClick}>Add Comment</button>
      {
        optimisticCommnents.map((comment) => (
            <div key={comment}>
                {comment}
            </div>
        ))
      }
    </div>
  )
}

export default OptimisticPage;
