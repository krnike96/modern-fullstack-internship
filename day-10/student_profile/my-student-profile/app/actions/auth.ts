'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signJWT } from '@/app/lib/auth'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const teacherEmail = process.env.TEACHER_EMAIL
  const teacherPassword = process.env.TEACHER_PASSWORD
  
  if (email === teacherEmail && password === teacherPassword) {
    const token = signJWT({ email, role: 'teacher' })
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    redirect('/students')
  } else {
    redirect('/login?error=Invalid credentials')
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  redirect('/login')
}