'use client'

import { useEffect, useState } from 'react'

import { fetchListings } from '@/app/lib/data'
import { camelCaseKeys } from '@/app/lib/utils'
import { Listing as ListingType } from '@/app/lib/definitions'
import ListingsGrid from './ui/listings-grid'
import { Loading } from './ui/loading'
import styles from './page.module.css'


export default function Home() {
  const [listings, setListings] = useState<ListingType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchListings()
        setListings(camelCaseKeys(data))
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    loading ?
      <Loading /> :
      error ?
        <p>Error connecting to the server.</p> :
        <ListingsGrid listings={listings} />
  )
}
