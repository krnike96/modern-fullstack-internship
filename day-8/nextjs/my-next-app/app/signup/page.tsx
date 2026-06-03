"use client"

import { signup } from "../actions/signup";

function Signup() {
  return (
    <>
        <h1>Sign Up</h1>
        <form action={signup}>
            <label htmlFor="username">Username: </label>
            <input type="text"
                   name="username"
                   id="username"
                   placeholder="Enter your username"
            />
            <br /><br />

            <label htmlFor="email">Email: </label>
            <input type="email"
                   name="email"
                   id="email"
                   placeholder="Enter your email"
            />
            <br /><br />

            <label htmlFor="password">Password: </label>
            <input type="text"
                   name="password"
                   id="password"
                   placeholder="Enter your password"
            />
            <br /><br />
            <button type="submit">Sign Up</button>
        </form>
    </>
  )
}

export default Signup;
