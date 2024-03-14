import { Listing } from './definitions'
import data from './mockup-data'

export async function fetchListings(): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, 2500, data)
  })
}

export async function sendContact(data: object): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, 2500, 'Contact sent successfully!')
  })
}
