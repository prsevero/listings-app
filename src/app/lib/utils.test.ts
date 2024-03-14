import { camelCaseKeys, currencyFormat, slugify } from './utils'

describe('camelCaseKeys', () => {
  it('correct parse empty array', () => {
    expect(camelCaseKeys([])).toStrictEqual([])
  })
  it('correct parse array', () => {
    expect(camelCaseKeys([{
      'Id': 1,
      'Sale Price': 100,
      'ThumbnailURL': 'key',
    }])).toStrictEqual([{
      'id': 1,
      'salePrice': 100,
      'thumbnailURL': 'key',
    }])
  })
})

 
describe('currencyFormat', () => {
  it('correct parse non number', () => {
    expect(currencyFormat()).toBe('')
  })
  it('correct parse sample string', () => {
    expect(currencyFormat('Beautiful spacious 1306 sq ft Bungalow')).toBe('')
  })
  it('correct parse sample number 1', () => {
    expect(currencyFormat(100)).toBe('$100')
  })
  it('correct parse sample number 2', () => {
    expect(currencyFormat(99999)).toBe('$99,999')
  })
})


describe('slugify', () => {
  it('correct parse empty string', () => {
    expect(slugify('')).toBe('')
  })
  it('correct parse sample string', () => {
    expect(slugify('Beautiful spacious 1306 sq ft Bungalow')).toBe('beautiful-spacious-1306-sq-ft-bungalow')
  })
})
