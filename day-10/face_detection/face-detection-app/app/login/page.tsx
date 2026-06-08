'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    setError('');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Invalid credentials');
    } else {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form action={handleLogin} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        
        <button type="submit">Sign In</button>
        
        <p style={{ fontSize: '0.9rem' }}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}