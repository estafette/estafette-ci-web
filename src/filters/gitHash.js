export default function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  if (value.length !== 40) {
    return value
  }
  return value.substring(0, 6)
}
