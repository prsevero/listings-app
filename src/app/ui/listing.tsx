'use client'

import Link from 'next/link'
import { LinkButton } from './button'
import { Listing } from '@/app/lib/definitions'
import { useListing } from '@/app/listing-context'
import { currencyFormat, slugify } from '@/app/lib/utils'
import styles from './listing.module.scss'


export default function Listing({ listing } : { listing: Listing }) {
  const { setContextListing } = useListing()
  const price = currencyFormat(listing.salePrice)
  const slug = slugify(listing.title)

  function handleClick() {
    setContextListing(listing)
  }

  return (
    <div className={styles.main}>
      <Link className={styles.img} href={`/${listing.id}/${slug}`} onClick={handleClick}>
        <img
          alt={`${listing.title.toLowerCase()} main photo`}
          src={listing.thumbnailURL}
        />
      </Link>

      <div>
        <h2 className={styles.title}>{listing.title}</h2>
        <p className={styles.location}>{listing.location}</p>
        <p className={styles.info}>
          {listing.bedrooms} beds | {listing.bathrooms} baths
        </p>
        <p className={styles.price}>{price}</p>
        <LinkButton href={`/${listing.id}/${slug}`} onClick={handleClick}>
          View details
        </LinkButton>
      </div>
    </div>
  )
}