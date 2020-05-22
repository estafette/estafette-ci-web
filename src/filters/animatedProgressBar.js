export default function (value) {
  if (!value) {
    return false
  }
  value = value.toString().toLowerCase()
  if (value === 'pending' || value === 'running' || value === 'canceling') {
    return true
  }
  return false
}
