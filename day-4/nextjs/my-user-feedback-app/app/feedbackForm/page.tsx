"use client";

import { useState } from "react";
import saveFeedback, { type Feedback } from "../actions/feedback";

function FeedbackForm() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    if (!name || !message) return;

    setFeedbacks([...feedbacks, { name, message }]);
    
    setName("");
    setMessage("");

    await saveFeedback(name, message);
  }

  return (
    <div>
      <h2>User Feedback</h2>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name"
          required
        />
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Message"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Feedbacks received:</h3>
      {feedbacks?.map((item, index) => (
        <div key={index}>
          <strong>{item.name}</strong>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackForm;
