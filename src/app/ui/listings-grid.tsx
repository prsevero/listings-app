import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listing as ListingType } from '@/app/lib/definitions'
import Listing from './listing'
import Filters from './filters'
import styles from './listings-grid.module.scss'

type stateType = {
  bathrooms: number,
  bedrooms: number,
  parking: number,
  price: number,
}

export default function ListingsGrid({ listings }: { listings: ListingType[] | null }) {
  const [
    filteredListings,
    setFilteredListings
  ] = useState<ListingType[]>(listings ? [...listings] : [])

  function handleChange(state: stateType) {
    if (!listings) return
    const filtered = listings.filter(listing =>
      listing.bathrooms >= state.bathrooms &&
      listing.bedrooms >= state.bedrooms &&
      listing.parking >= state.parking &&
      listing.salePrice <= state.price)
    setFilteredListings(filtered)
  }

  useEffect(() => {
    setFilteredListings(listings ? [...listings] : [])
  }, [listings])

  return (
    <>
      <Filters listings={listings} onChange={handleChange} />
      {!filteredListings || !Array.isArray(filteredListings) || !filteredListings.length ?
        <p className={styles.empty}>No listings found.</p> :
        <div className={styles.grid}>
          {filteredListings.map(listing =>
            <Listing key={listing.id} listing={listing} />)}
        </div>}
    </>
  )
}
