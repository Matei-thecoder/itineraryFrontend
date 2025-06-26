'use client'

import { useRouter } from 'next/navigation'

export default function CreateItineraryPage() {
  const router = useRouter()

  const handleChoice = (type) => {
    router.push(`/create-itinerary/${type}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 z-0"></div>
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-10 flex flex-col items-center relative z-10">
        <h1 className="text-gray-900 text-3xl font-bold mb-10 text-center">
          Choose Itinerary Type
        </h1>
        <div className="flex gap-8 w-full justify-center">
          <button
            onClick={() => handleChoice('single-city')}
            className="w-36 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-semibold text-gray-800
              hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition"
          >
            One City
          </button>
          <button
            onClick={() => handleChoice('multi-city')}
            className="w-36 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-semibold text-gray-800
              hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition"
          >
            Multiple Cities
          </button>
        </div>
      </div>
    </main>
  )
}
