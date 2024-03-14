import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './header'

describe('Header', () => {
  it('renders a header', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
  it('contains two links', () => {
    render(<Header />)
    const link = screen.getAllByRole('link')
    expect(link.length).toBe(2)
  })
  it('contains a link to homepage', () => {
    render(<Header />)
    const link = screen.getAllByRole('link')
    expect(link[0].getAttribute('href')).toBe('/')
  })
  it('contains a link to favorites listings', () => {
    render(<Header />)
    const link = screen.getAllByRole('link')
    expect(link[1].getAttribute('href')).toBe('/favorites')
  })
})
