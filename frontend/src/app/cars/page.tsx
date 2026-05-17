'use client'

import { useEffect, useState } from 'react'
import { listingAPI } from '@/lib/api/listings'
import { Listing, PaginatedResponse } from '@/types'
import ListingCard from '@/components/ListingCard'

export default function CarsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const response = await listingAPI.getByVertical('CARS', page, 12)
        setListings(response.data.content)
        setError(null)
      } catch (err) {
        setError('Failed to load listings')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [page])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cars for Sale</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="py-2">Page {page + 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
