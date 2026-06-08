// app/login/page.tsx
'use client'

import { useState } from 'react'
import { loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState('')
  
  async function handleFormAction(formData: FormData) {
    try {
      await loginAction(formData)
    } catch (err: any) {
      if (err.message && err.message.includes('NEXT_REDIRECT')) {
        throw err;
      }
      console.error(err);
      setError('Login failed');
    }
  }
  
  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 4 }}>
      <h1 style={{ marginBottom: 20 }}>Teacher Login</h1>
      <form action={handleFormAction}> 
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Email</label>
          <input type="email" name="email" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Password</label>
          <input type="password" name="password" required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  )
}