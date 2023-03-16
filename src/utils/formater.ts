import terminal from 'virtual:terminal'

/**
 * transform value to IDR format
 * @param {string} value 100000
 * @return{string} 100.000
 */
export const setToIDR = (value: number) => {
  let formatter = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  return formatter.format(value)
}

export const setPricePerPortion = (portionType: string, portion: number) => {
  if (portionType == 'satuan') {
    return `\/ pcs`
  } else if (portionType == 'gram') {
    return `\/ ${portion} gram`
  }
}
