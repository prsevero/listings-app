'use client'

import { useEffect, useState } from 'react'
import { Listing as ListingType } from '@/app/lib/definitions'
import ListingsGrid from '@/app/ui/listings-grid'
import { Loading } from '@/app/ui/loading'

export default function Favorites() {
  const [listings, setListings] = useState<ListingType[] | null>(null)

  useEffect(() => {
    const storageListings = localStorage.getItem('listingsSaved')
    setListings(storageListings ? JSON.parse(storageListings) : [])
  }, [])

  return (
    listings === null ?
      <Loading /> :
      <ListingsGrid listings={listings} />
  )
}
