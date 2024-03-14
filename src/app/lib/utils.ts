// @ts-nocheck

import Listings from './definitions'

function camelCase(str: string): string {
  let newStr = str[0].toLowerCase() + str.slice(1)
  newStr = newStr.replace(' ', '')
  return newStr
}

export function camelCaseKeys(arr: object[]): Listings[] {
  return arr.map(value => {
    const obj = Object.keys(value).reduce((result, key, index) => {
      if (index === 1) {
        result = {[camelCase(result)]: value[result]}
      }

      return {
        ...result,
        [camelCase(key)]: value[key],
      }
    })
    return obj
  })
}

export function currencyFormat(number: number): string {
  if (isNaN(number)) return ''

  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(number)
}

export function dateFormat(date: string): string {
  return new Date(date).toLocaleDateString(
    'en-US', {month: 'long', day: 'numeric', year: 'numeric'})
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/ /g, '-')
}
