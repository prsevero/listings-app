import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Listing as ListingType } from '@/app/lib/definitions'
import { sendContact } from '@/app/lib/data'
import { currencyFormat, dateFormat } from '@/app/lib/utils'
import { Button } from '@/app/ui/button'
import StarIcon from './icons/star'
import StarSolidIcon from './icons/star-solid'
import styles from './listing-detail.module.scss'

const schema = z.object({
  comments: z.string().min(5),
  email: z.string().email(),
  name: z.string().min(3),
  phone: z.string().min(8),
})

type errorsObjectType = {
  comments?: string
  email?: string
  name?: string
  phone?: string
}

type initialStateType = {
  comments: string
  email: string
  name: string
  phone: string
}

type actionType = {
  name: string
  value?: string | number
}

export default function ListingDetail({
  listing
}: {
  listing: ListingType
}) {
  const router = useRouter()
  const [isFav, setIsFav] = useState<boolean>(false)

  function handleClose(): void {
    router.back()
  }

  function handleToggleSaved(): void {
    const listingsStored = localStorage.getItem('listingsSaved')
    let listings
    let fav = true
    if (listingsStored) {
      listings = JSON.parse(listingsStored)
      let index: number = -1
      for (let i=0, max=listings.length; i<max; i++) {
        if (listings[i].id === listing.id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        listings.splice(index, 1)
        fav = false
      } else listings.push(listing)
    } else listings = [listing]
    localStorage.setItem('listingsSaved', JSON.stringify(listings))
    setIsFav(fav)
  }

  useEffect(() => {
    const listingsStored = localStorage.getItem('listingsSaved')
    if (listingsStored) {
      const listings: ListingType[] = JSON.parse(listingsStored)
      if (listings.filter((l: ListingType) => l.id === listing.id).length)
        return setIsFav(true)
    }
    setIsFav(false)
  }, [])

  // Form
  const [sent, setSent] = useState<boolean>(false)
  const [sentError, setSentError] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<errorsObjectType | null>(null)
  const initialState = {
    comments: '',
    email: '',
    name: '',
    phone: '',
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  function reducer(state: initialStateType, action: actionType) {
    if (action.name === 'reset') {
      return {...initialState}
    }
    return {
      ...state,
      [action.name]: action.value,
    }
    throw Error('Unknown action.')
  }

  function validate() {
    try {
      const data = schema.parse(state)
      setErrors(null)
      return data
    } catch (errors: any) {
      let stateErrors: errorsObjectType = {}
      errors.issues.map((error: z.ZodIssue) => {
        if (error.path && error.path.length) {
          // @ts-ignore
          stateErrors[error.path[0]] = error.message
        }
      })
      setErrors(stateErrors)
      return null
    }
  }

  function handleChange(
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      name: name,
      value: e.target.value,
    })
    validate()
    setSent(false)
  }

  async function handleSubmit(): Promise<void> {
    const data = validate()
    if (data) {
      // Mock API call data
      setSubmitting(true)
      setSent(false)
      setSentError(false)

      try {
        const res = await sendContact(data)
        dispatch({name: 'reset'})
        setSent(true)
      } catch (error) {
        setSentError(true)
      }finally {
        setSubmitting(false)
      }
    }
  }

  return (
    <>
      <div className={styles['img-wrapper']}>
        <img
          alt={`${listing.title.toLowerCase()} main photo`}
          className={styles.img}
          src={listing.pictureURL}
        />
        <button onClick={handleToggleSaved}>
          {isFav ? <StarSolidIcon /> : <StarIcon />}
        </button>
        <button onClick={handleClose}>x</button>
      </div>
      <div className={styles.wrapper}>
        <h1>{listing.title}</h1>
        <div className={styles['location-and-date']}>
          <p className={styles.location}>{listing.location}</p>
          <p className={styles.date}>Listed: {dateFormat(listing.dateListed)}</p>
          <p className={styles.info}>
            <span>{listing.bedrooms} beds</span>
            <span>{listing.bathrooms} baths</span>
            <span>{listing.parking} parking</span>
            <span>{listing.sqft} sqft</span>
            <span>{listing.yearBuilt} year built</span>
          </p>
        </div>
        <p className={styles.description}>{listing.description}</p>
        <p className={styles.price}>Sale price: {currencyFormat(listing.salePrice)}</p>

        <hr className={styles.divider} />

        <h4 className={styles['form-title']}>Contact an agent</h4>
        {sent && <p className={styles.feedback}>Contact sent successfully.</p>}
        {sentError &&
          <p className={styles['feedback-error']}>An error ocurred, please try again.</p>}
        <form action={handleSubmit}>
          <fieldset className={styles.fieldset} disabled={submitting}>
            <label className={styles.label}>
              <input
                onChange={e => handleChange('name', e)}
                className={styles.input}
                placeholder="Name"
                type="text"
                value={state.name}
              />
              {errors && errors.name &&
                <p className={styles.error}>{errors.name}</p>}
            </label>
            <label className={styles.label}>
              <input
                onChange={e => handleChange('email', e)}
                className={styles.input}
                placeholder="E-mail"
                type="email"
                value={state.email}
              />
              {errors && errors.email &&
                <p className={styles.error}>{errors.email}</p>}
            </label>
            <label className={styles.label}>
              <input
                onChange={e => handleChange('phone', e)}
                className={styles.input}
                placeholder="Telephone"
                type="tel"
                value={state.phone}
              />
              {errors && errors.phone &&
                <p className={styles.error}>{errors.phone}</p>}
            </label>
            <label className={styles.label}>
              <textarea
                onChange={e => handleChange('comments', e)}
                className={styles.input}
                placeholder="Comments"
                value={state.comments}
              />
              {errors && errors.comments &&
                <p className={styles.error}>{errors.comments}</p>}
            </label>
          </fieldset>

          <Button
            onClick={handleSubmit}
            disabled={submitting || errors !== null} 
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}
