'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignup(formData: FormData) {
    setError('');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      router.push('/login');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form action={handleSignup} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        
        <button type="submit">Register</button>
        
        <p style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}