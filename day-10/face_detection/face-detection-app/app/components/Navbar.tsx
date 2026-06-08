'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setEmail(data.user.email);
        } else {
          setEmail(null);
        }
      } catch (err) {
        setEmail(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [pathname]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setEmail(null);
    router.push('/login');
    router.refresh();
  }

  if (loading) return <div style={{ padding: '10px' }}>Loading...</div>;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
          Face App
        </Link>
      </div>
      
      <div>
        {email ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>{email}</span>
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}