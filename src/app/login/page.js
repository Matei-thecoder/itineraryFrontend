'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Logging in with:', form)
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // ✅ Store JWT (adjust to your storage strategy)
      localStorage.setItem('token', data.token)

      // ✅ Optionally store user info
      localStorage.setItem('user', JSON.stringify(data.user))

      // ✅ Redirect to home/main page
      router.push('/main')

    } catch (err) {
      console.log(err.message)
    }
  
    // Add your login logic here (API call, redirect, etc.)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 z-0"></div>
      <div className="relative z-10 mb-8 text-5xl font-extrabold text-white drop-shadow-[0_4px_24px_rgba(80,0,180,0.6)] tracking-tight text-center">
        Welcome back!
      </div>
      <Card className="w-full max-w-md shadow-xl relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >Login</button>
            <p className="mt-4 text-sm text-center text-gray-600">
            Dont you have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
