export default function (value, outline = false) {
  const prefix = outline ? 'outline-' : ''
  if (!value) {
    return prefix + 'light'
  }
  value = value.toString().toLowerCase()
  if (value === 'succeeded' || value === 'success') {
    return prefix + 'success'
  }
  if (value === 'running' || value === 'warning') {
    return prefix + 'warning'
  }
  if (value === 'failed' || value === 'danger') {
    return prefix + 'danger'
  }
  if (value === 'skipped' || value === 'secondary') {
    return prefix + 'secondary'
  }
  if (value === 'canceling') {
    return prefix + 'secondary'
  }
  if (value === 'canceled') {
    return prefix + 'secondary'
  }
  if (value === 'pending') {
    return prefix + 'info'
  }
  if (value === 'all' || value === 'primary') {
    return prefix + 'primary'
  }
  return prefix + 'light'
}
