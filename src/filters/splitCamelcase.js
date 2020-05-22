export default function (value) {
  if (!value) {
    return ''
  }

  return value.replace(/([a-z])([A-Z])/g, '$1 $2')
}
