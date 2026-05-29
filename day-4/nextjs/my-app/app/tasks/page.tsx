
"use client";
import submitContactForm from "../actions/submitContactForm";
function Form() {

  return (
    <div>
      <h1>Contact Form</h1>
      <form action={submitContactForm}>
        <label htmlFor="fullName">Full Name: </label>
        <input type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your name"
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <br />
        <label htmlFor="message">Message: </label>
        <textarea name="message"
          id="message"
        >

        </textarea>
        <br />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Form;
