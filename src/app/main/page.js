'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MainPage() {
  const [user, setUser] = useState({ name: '', id: '' })
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const fetchItineraries = async (userId, token) => {
    try {
      const res = await fetch(`http://localhost:4000/api/itineraries/getall?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (Array.isArray(data)) {
        setItineraries(data)
      } else if (Array.isArray(data.itineraries)) {
        setItineraries(data.itineraries)
      } else {
        setItineraries([])
        console.error('Expected array but got:', data)
      }
    } catch (err) {
      console.error('Failed to fetch itineraries:', err)
      setItineraries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  const storedUser = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if (storedUser && token) {
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    fetchItineraries(parsedUser.id, token) // ✅ use _id instead of id
  } else {
    setLoading(false)
  }
}, [])
const handleRemove = async (id) => {
  const token = localStorage.getItem('token')
  if (!token) return alert('No auth token found.')

  try {
    const res = await fetch(`http://localhost:4000/api/itineraries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to delete')
    }

    setItineraries((prev) => prev.filter((item) => item._id !== id))
  } catch (err) {
    console.error('Delete failed:', err.message)
    alert('Failed to delete itinerary.')
  }
}


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Itinerary App</h1>
        <div className="text-lg font-medium">{user?.name || 'Loading...'}</div>
      </header>

      {/* Main content */}
      <main className="flex-grow p-6 space-y-12">
        {/* CTA section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Ready to plan your next trip?
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/create-itinerary">
              <Button className="bg-blue-600 rounded-xl hover:bg-blue-700 text-white px-6 py-3 text-lg">
                Create Itinerary
              </Button>
            </Link>
          </div>
        </section>

        {/* Itineraries Section */}
        <section className="space-y-4 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">Your Itineraries</h3>

          {loading ? (
            <p className="text-gray-500 text-center mt-6">Loading itineraries...</p>
          ) : itineraries.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No itineraries yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {itineraries.map((item) => (
                <Card
                  key={item._id}
                  className="shadow-md hover:shadow-lg transition hover:cursor-pointer border border-blue-100 hover:border-blue-400 h-full flex flex-col rounded-2xl bg-white/70"
                  style={{ maxWidth: '380px', margin: '0 auto' }}
                >
                  <button
                    onClick={() => router.push(`/itinerary/${item._id}`)}
                    className="text-left w-full flex-1"
                    style={{ all: 'unset', cursor: 'pointer' }}
                  >
                    <CardHeader className="rounded-t-2xl">
                      <CardTitle className="text-xl text-blue-800">
                        {item.title || item.cityName || 'Untitled Itinerary'}{' '}
                        <span className="text-sm text-gray-400">({item.type})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-8">
                      <p className="text-gray-600">
                        {item.description ||
                          `Includes ${item.nrOfLocations || item.locations?.length || 'unknown'} locations`}
                      </p>
                    </CardContent>
                  </button>
                  <Button
                    onClick={() => handleRemove(item._id)}
                    variant="destructive"
                    className="mx-auto mb-3 bg-red-500/80 hover:bg-red-600/90 text-white text-xs px-6 py-2 rounded-2xl transition-colors duration-200 w-32 mt-6"
                  >
                    Remove
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
