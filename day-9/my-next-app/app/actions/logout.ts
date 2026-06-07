"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function logout() {
  const cookie = await cookies();
  const token = cookie.get("token");
  if(!token)
    throw new Error("Token not found in cookies");
  cookie.delete("token");
  redirect("/login");
}

export default logout
