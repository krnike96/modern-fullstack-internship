"use client"

import { login } from "../actions/login"

function Login() {
    
  return (
    <>
        <h1>Login</h1>
        <form action={login}>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
            <br /><br />

            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <br /><br />

            <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login
