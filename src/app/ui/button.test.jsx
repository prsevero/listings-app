import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button, LinkButton } from './button'

describe('Button', () => {
  it('renders button', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
  it('renders button with children', () => {
    const text = 'button'
    render(<Button>{text}</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(text)
  })
  it('renders button and call function when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}></Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})


describe('LinkButton', () => {
  it('renders link button', () => {
    render(<LinkButton href="testing" />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
  it('renders link button with children', () => {
    const text = 'button'
    render(<LinkButton href="">{text}</LinkButton>)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(text)
  })
  it('renders link button with correct href', () => {
    const text = 'button'
    render(<LinkButton href={text}></LinkButton>)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe(text)
  })
})
