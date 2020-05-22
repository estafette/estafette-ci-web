export default function (value) {
  if (value === null) {
    return ''
  }

  if (value <= 0) {
    return ''
  }

  var seconds = Math.floor(value / Math.pow(10, 9))
  if (seconds > 300) {
    return 'text-danger'
  }
  if (seconds > 120) {
    return 'text-warning'
  }

  return 'text-success'
}
