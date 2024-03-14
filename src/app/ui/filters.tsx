import { useEffect, useReducer, useState } from 'react'
import { Listing as ListingType } from '@/app/lib/definitions'
import InputRange from './input-range'
import Select from './select'
import styles from './filters.module.scss'

type actionType = {
  type: string
  value: string | undefined
}

type initialStateType = {
  bathrooms: number | undefined,
  bedrooms: number | undefined,
  parking: number | undefined,
  price: number | undefined,
}

export default function Filters({
  listings, onChange
}: {
  listings: ListingType[] | null,
  onChange: Function
}) {
  const [bathroomsOpts, setBathroomsOpts] = useState<number[]>([])
  const [bedroomsOpts, setBedroomsOpts] = useState<number[]>([])
  const [parkingOpts, setParkingOpts] = useState<number[]>([])
  const [max, setMax] = useState<number | undefined>(undefined)
  const [min, setMin] = useState<number | undefined>(undefined)
  const [step, setStep] = useState<number | undefined>(undefined)

  const initialState = {
    bathrooms: 0,
    bedrooms: 0,
    parking: 0,
    price: undefined,
  }

  function calculateValues(): void {
    let _max: number | undefined = undefined
    let _min: number | undefined = undefined
    let bathOpts: number[] = []
    let bedsOpts: number[] = []
    let parkOpts: number[] = []

    if (listings) {
      listings.map(listing => {
        if (bathOpts.indexOf(listing.bathrooms) < 0)
          bathOpts.push(listing.bathrooms)
        if (bedsOpts.indexOf(listing.bedrooms) < 0)
          bedsOpts.push(listing.bedrooms)
        if (parkOpts.indexOf(listing.parking) < 0)
          parkOpts.push(listing.parking)
        if (_max === undefined || listing.salePrice > _max) _max = listing.salePrice
        if (_min === undefined || listing.salePrice < _min) _min = listing.salePrice
      })
      setBathroomsOpts(bathOpts.sort())
      setBedroomsOpts(bedsOpts.sort())
      setParkingOpts(parkOpts.sort())
      setMax(_max)
      setMin(_min)
      setStep(_max !== undefined && _max >= 0 &&
        _min !== undefined && _min >= 0 ? (_max - _min) / 100 : undefined)
      dispatch({type: 'price', value: _max})
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  function reducer(state: initialStateType, action: actionType) {
    return {
      ...state,
      [action.type]: action.value !== undefined ?
        parseInt(action.value) : action.value,
    }
    throw Error('Unknown action.');
  }

  function handleChange(
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    dispatch({
      type: name,
      value: e.target.value,
    })
  }

  useEffect(() => {
    calculateValues()
  }, [listings])

  useEffect(() => {
    onChange(state)
  }, [state])


  return (
    <div className={styles.filters}>
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('bedrooms', e)}
        options={bedroomsOpts}
        title="Bedrooms (min.)" />
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('bathrooms', e)}
        options={bathroomsOpts}
        title="Bathrooms (min.)" />
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('parking', e)}
        options={parkingOpts}
        title="Parking (min.)" />
      <InputRange
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('price', e)}
        min={min}
        max={max}
        step={step}
        title="Price (max.)"
        value={state.price}
      />
    </div>
  )
}
