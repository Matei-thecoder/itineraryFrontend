'use client'

import { useState ,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SingleCityForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    cityName: '',
    numberOfLocations: 0,
    organizedGeographically: false,
  })

  const [userId, setUserId] = useState(null);
   useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserId(user.id)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

   const handleSubmit = async (e) => {
  e.preventDefault()

  const token = localStorage.getItem('token')
  if (!token || !userId) return alert('Not authenticated')

  const payload = {
    cityName: form.cityName,
    numberOfLocations: parseInt(form.numberOfLocations),
    organizedGeographically: form.organizedGeographically,
    userId,
  }

  try {
    const res = await fetch('https://itinerarybackend.onrender.com/api/itineraries/single-city', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const error = await res.json()
      alert(error.message || 'Failed to create itinerary')
      return
    }

    const createdItinerary = await res.json()
    const newId = createdItinerary._id

    if (!newId) {
      alert('Failed to get new itinerary ID')
      return
    }

    router.push(`/itinerary/${newId}`)
  } catch (err) {
    console.error(err)
    alert('Error submitting itinerary.')
  }
}


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 z-0"></div>
      <Card className="max-w-md w-full shadow-xl bg-white relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-900">Single City Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="cityName" className="block text-gray-700 font-semibold mb-1">
                City Name
              </label>
              <Input
                id="cityName"
                name="cityName"
                type="text"
                placeholder="Enter city name"
                value={form.cityName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="numberOfLocations" className="block text-gray-700 font-semibold mb-1">
                Number of Locations
              </label>
              <Input
                id="numberOfLocations"
                name="numberOfLocations"
                type="number"
                min={1}
                placeholder="Enter number of locations"
                value={form.numberOfLocations}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="organizedGeographically"
                name="organizedGeographically"
                checked={form.organizedGeographically}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="organizedGeographically" className="text-gray-700 font-semibold select-none">
                Organized geographically?
              </label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
