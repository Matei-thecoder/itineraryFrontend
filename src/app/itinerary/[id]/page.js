'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ItineraryDetails() {
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const id = params?.id
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    const token = localStorage.getItem('token')

    fetch(`http://localhost:4000/api/itineraries/x/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.type === 'single' && Array.isArray(data.locations)) {
          setItinerary(data)
        } else {
          console.warn('Itinerary is not a single city or missing locations.')
          setItinerary(null)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch itinerary:', err)
        setLoading(false)
      })
  }, [id])

  const handleRemoveLocation = async (indexToRemove) => {
    if (!itinerary) return

    const locationToRemove = itinerary.locations[indexToRemove]
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(
        `http://localhost:4000/api/itineraries/${itinerary._id}/locations/${locationToRemove._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const error = await res.json()
        alert(error.message || 'Failed to remove location')
        return
      }

      // Update frontend state after successful delete
      const updatedLocations = itinerary.locations.filter((_, i) => i !== indexToRemove)
      setItinerary({
        ...itinerary,
        locations: updatedLocations,
        numberOfLocations: updatedLocations.length,
      })
    } catch (err) {
      console.error(err)
      alert('Error removing location')
    }
  }

  const generateGoogleMapsUrl = () => {
    if (!itinerary?.locations?.length) return '#'
    const base = 'https://www.google.com/maps/dir/'
    const query = itinerary.locations.map((loc) => encodeURIComponent(loc.name)).join('/')
    return `${base}${query}`
  }

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading itinerary...</p>
  }

  if (!itinerary) {
    return <p className="text-center mt-8 text-red-500">Itinerary not found or invalid.</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 z-0"></div>
      <Card className="max-w-4xl mx-auto shadow-lg relative z-10">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
          <CardTitle className="text-3xl">{itinerary.cityName || 'Untitled Itinerary'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <p className="text-gray-600">
            <strong>Number of Locations:</strong> {itinerary.numberOfLocations || itinerary.locations.length}
          </p>

          <div className="space-y-4">
            {itinerary.locations.map((loc, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">{loc.name}</p>
                  <p className="text-sm text-gray-600">{loc.description || 'No description'}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveLocation(idx)}
                  className="ml-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-base px-5 py-2 rounded-lg transition-colors duration-200"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <a
              href={generateGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xl py-4 rounded-2xl">
                Transport to Google Maps
              </Button>
            </a>
            <Button
              onClick={() => router.push('/main')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 rounded-2xl"
            >
              Back to Main
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
