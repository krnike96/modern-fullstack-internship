import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET!

export function signJWT(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}