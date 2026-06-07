"use client"

import login from '../actions/login';
import Link from 'next/link';


function Login() {
  return (
    <>
        <h1>Login : </h1>
        <form action={login}>
            <label htmlFor="email">Email : </label>
            <input type="email" name='email' placeholder='Enter your email' />
            <br /><br />

            <label htmlFor="password">Password : </label>
            <input type="password" name='password' placeholder='Enter new password' />
            <br /><br />

            <button type='submit'>Login</button>
            <Link href="/signup">New? Sign up</Link>
        </form>
    </>
  )
}

export default Login;
