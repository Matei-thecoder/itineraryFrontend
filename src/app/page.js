'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  const handleSignupRedirect = () => {
    router.push('/signup')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 z-0"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 text-5xl font-extrabold text-white drop-shadow-[0_4px_24px_rgba(80,0,180,0.6)] tracking-tight text-center">
          Time to create your itinerary
        </div>
        <Button
          className="mt-4 px-8 py-4 text-xl rounded bg-white text-black/70 font-bold shadow-lg hover:bg-blue-100 transition"
          onClick={handleSignupRedirect}
        >
          Get Started
        </Button>
      </div>
    </main>
  )
}
