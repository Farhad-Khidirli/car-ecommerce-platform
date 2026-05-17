'use client'

import { useEffect, useState } from 'react'
import { listingAPI } from '@/lib/api/listings'
import { Listing } from '@/types'

interface ListingDetailsProps {
  params: {
    id: string
  }
}

export default function ListingDetailsPage({ params }: ListingDetailsProps) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingAPI.getById(parseInt(params.id))
        setListing(response.data)
      } catch (err) {
        setError('Failed to load listing')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.id])

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!listing) return <div className="text-center py-12">Listing not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            {listing.imageUrls[0] ? (
              <img
                src={listing.imageUrls[0]}
                alt={listing.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {listing.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${listing.title} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <p className="text-gray-600 mb-4">{listing.location}</p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-4xl font-bold text-primary">
              {listing.price.toLocaleString()} {listing.currency}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Type: {listing.listingType}
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-3">About Seller</h3>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">{listing.seller.username}</p>
                <p className="text-yellow-500 font-semibold">
                  ★ {listing.seller.rating} ({listing.seller.totalReviews} reviews)
                </p>
              </div>
              <button className="ml-auto bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Contact Seller
              </button>
            </div>
          </div>

          <div className="border-t mt-6 pt-4">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
