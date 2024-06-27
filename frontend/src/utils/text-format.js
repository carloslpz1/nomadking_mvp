export const toCapitalize = (text) => {
  if (text !== null)
    return text.charAt(0).toUpperCase() + text.slice(1)
  else
    return ''
}