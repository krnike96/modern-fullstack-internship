"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray", marginBottom: "20px" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/about">About</Link> |{" "}
      <Link href="/contact">Contact</Link> |{" "}
      <Link href="/cart">Cart</Link>
      {user ? (
        <>
          {" "}| Welcome {user.name} |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <> | <Link href="/login">Login</Link></>
      )}
    </nav>
  );
}