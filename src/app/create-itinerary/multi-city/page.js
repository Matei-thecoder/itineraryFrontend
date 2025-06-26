'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function MultiCityPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Itinerary App</h1>
        <div />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white/80 rounded-2xl shadow-lg px-10 py-12 flex flex-col items-center">
          <p className="text-2xl text-gray-500 mb-8">Not working yet</p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl"
            onClick={() => router.push('/main')}
          >
            Back to Main
          </Button>
        </div>
      </main>
    </div>
  )
}