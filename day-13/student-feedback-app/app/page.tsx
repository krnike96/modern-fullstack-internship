'use client'
import {useState, useEffect} from 'react';

export default function Home(){
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  
  async function getAllFeedbacks(){
    // make a get req to /api/feedbacks 
    const response = await fetch('/api/feedbacks', {
      method: "GET"
    });
    const data = await response.json();
    setFeedbacks(data);
  }

  useEffect(() => {
    getAllFeedbacks();
  }, [])
  function handleChange(e:any){
    setMessage(e.target.value);
  }
  async function addFeedback(){
    fetch('/api/feedbacks', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      }, 
      body: JSON.stringify({
        message
      })
    })
    getAllFeedbacks();
  }

  async function deleteFeedback(id: number){
    fetch(`/api/feedbacks?id=${id}`, {
      method: "DELETE"
    });

    getAllFeedbacks();
  }
  return (
    <div>
      <input type="text" 
      value={message} 
      placeholder="Write your feedback"
      onChange={handleChange} 
      />
      <button onClick={addFeedback}>Add Feedback</button>

      {
        feedbacks.map((feedback:any) => (
          <div key={feedback.id}>
            <p>{feedback.message}</p>
            <button onClick={() => deleteFeedback(feedback.id)}>Delete Feedback</button>
            <hr />
          </div>
        ))
      }
    </div>
  )
}