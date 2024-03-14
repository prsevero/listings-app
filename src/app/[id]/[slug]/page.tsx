'use client'

import { useEffect, useState } from 'react'
import ErrorPage from 'next/error'
import { ListingContextType, useListing } from "@/app/listing-context"
import { fetchListings } from '@/app/lib/data'
import { Listing } from '@/app/lib/definitions'
import { camelCaseKeys } from '@/app/lib/utils'
import ListingDetail from '@/app/ui/listing-detail'
import { Loading } from '@/app/ui/loading'


export default function Page({
  params
}: {
  params: {id: string, slug: string}
}) {
  const { contextListing, setContextListing } = useListing()
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ notFound, setNotFound ] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (!contextListing) {
        let data = await fetchListings()
        if (!data) return setNotFound(true)

        const id = parseInt(params.id)

        const listing = data.filter((d: Listing) => d.id === id)
        if (listing.length) {
          const l: Listing[] = camelCaseKeys([listing[0]]) as Listing[]
          setContextListing(l[0])
        } else {
          setNotFound(true)
        }

        setLoading(false)
      } else setLoading(false)
    })()
  }, [])

  if (loading) return <Loading />
  else if (!contextListing || notFound) return <ErrorPage statusCode={404} />

  return (
    <ListingDetail listing={contextListing} />
  )
}
