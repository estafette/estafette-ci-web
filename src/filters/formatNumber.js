export default function (value) {
  if (value === null) {
    return ''
  }

  return new Intl.NumberFormat('de-DE').format(value)
}
