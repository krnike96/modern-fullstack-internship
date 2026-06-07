"use client"
import signup from '../actions/signup';
import Link from "next/link";

function Signup() {
  return (
    <>
        <h1>Sign Up : </h1>
        <form action={signup}>
            <label htmlFor="username">Name : </label>
            <input type="text" name='username' id='username' placeholder='Enter your name' />
            <br /><br />

            <label htmlFor="email">Email : </label>
            <input type="email" name='email' id='email' placeholder='Enter your email' />
            <br /><br />

            <label htmlFor="password">Password : </label>
            <input type="password" name='password' id='password' placeholder='Enter password' />
            <br /><br />

            <button type='submit'>Sign Up</button>
            <span>Already Registered? <Link href="/login">Login</Link></span>
        </form>
    </>
  )
}

export default Signup;
