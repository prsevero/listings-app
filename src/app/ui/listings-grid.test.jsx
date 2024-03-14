import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import data from '@/app/lib/mockup-data'
import { ListingContext } from '@/app/listing-context'
import { camelCaseKeys } from '@/app/lib/utils'
import ListingsGrid from './listings-grid'

const listings = camelCaseKeys(data)

const providerProps = {
  value: {},
}

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <ListingContext.Provider {...providerProps}>{ui}</ListingContext.Provider>,
    renderOptions,
  )
}

describe('ListingsGrid', () => {
  it('renders a empty ListingsGrid without props', () => {
    customRender(<ListingsGrid />, {providerProps})
    const listingsGrid = screen.getByText(/no listings found/i)
    expect(listingsGrid).toBeInTheDocument()
  })
  it('renders a empty ListingsGrid with empty listings', () => {
    customRender(<ListingsGrid listings={[]} />, {providerProps})
    const listingsGrid = screen.getByText(/no listings found/i)
    expect(listingsGrid).toBeInTheDocument()
  })
  it('renders a list with same array length', () => {
    customRender(<ListingsGrid listings={listings} />, {providerProps})
    const listingsGrid = screen.getAllByRole('img')
    expect(listingsGrid.length).toBe(listings.length)
  })
})
