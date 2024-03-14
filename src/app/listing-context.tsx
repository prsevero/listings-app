'use client'

import { createContext, useContext, useState } from 'react'
import { Listing } from './lib/definitions'

export type ListingContextType = {
  contextListing: Listing | undefined
  setContextListing: (l: Listing) => void
}

export const ListingContext = createContext<ListingContextType>({
  contextListing: undefined,
  setContextListing: () => {}
})

export const ListingProvider = ({ children }: {children: React.ReactNode}) => {
  const [contextListing, setContextListing] = useState<Listing>()

  return (
    <ListingContext.Provider
      value={{
        contextListing,
        setContextListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  )
}

export const useListing = () => useContext(ListingContext)
