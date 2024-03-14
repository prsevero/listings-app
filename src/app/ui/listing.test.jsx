import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Listing from './listing'
import data from '@/app/lib/mockup-data'
import { camelCaseKeys, currencyFormat, slugify } from '@/app/lib/utils'
import { ListingContext } from '@/app/listing-context'

const object = camelCaseKeys([data[1]])[0]
const priceFormatted = currencyFormat(object.salePrice)
const slug = slugify(object.title)
const providerProps = {
  value: {
    contextListing: object
  },
}

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <ListingContext.Provider {...providerProps}>{ui}</ListingContext.Provider>,
    renderOptions,
  )
}


describe('Listing', () => {
  it('renders two links', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const link = screen.getAllByRole('link')
    expect(link.length).toBe(2)
  })
  it('renders links src correctly', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const link = screen.getAllByRole('link')
    expect(link[0].getAttribute('href')).toBe(`/${object.id}/${slug}`)
    expect(link[1].getAttribute('href')).toBe(`/${object.id}/${slug}`)
  })
  it('renders img correctly', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toBe(object.thumbnailURL)
  })
  it('renders a title', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(object.title)
  })
  it('renders location', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const location = screen.getByText(object.location)
    expect(location).toBeInTheDocument()
  })
  it('renders beds', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const str = `${object.bedrooms} beds`
    const beds = screen.getByText(new RegExp(str, 'i'))
    expect(beds).toBeInTheDocument()
  })
  it('renders baths', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const str = `${object.bathrooms} baths`
    const baths = screen.getByText(new RegExp(str, 'i'))
    expect(baths).toBeInTheDocument()
  })
  it('renders price', () => {
    customRender(<Listing listing={object} />, {providerProps})
    const price = screen.getByText(priceFormatted)
    expect(price).toBeInTheDocument()
  })
})
