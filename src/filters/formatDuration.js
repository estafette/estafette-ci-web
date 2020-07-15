export default function (value, digits) {
  if (value === null) {
    return ''
  }

  if (value < 0) {
    return ''
  }

  if (digits === null) {
    digits = 1
  }

  var days = Math.floor(value / (24 * 3600 * Math.pow(10, 9)))
  var remainderForHours = value % (24 * 3600 * Math.pow(10, 9))
  var hours = Math.floor(remainderForHours / (3600 * Math.pow(10, 9)))
  var remainderForMinutes = remainderForHours % (3600 * Math.pow(10, 9))
  var minutes = Math.floor(remainderForMinutes / (60 * Math.pow(10, 9)))
  var remainderForSeconds = remainderForMinutes % (60 * Math.pow(10, 9))
  var seconds = Math.floor(remainderForSeconds / Math.pow(10, 9))
  var remainderForMilliseconds = remainderForSeconds % Math.pow(10, 9)

  var deciSeconds = Math.floor(remainderForMilliseconds / Math.pow(10, 8))

  var formattedString = ''

  if (days > 0) {
    formattedString += `${days}d`
  }
  if (hours > 0 || days > 0) {
    formattedString += `${hours}h`
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    formattedString += `${minutes}m`
  }
  if ((deciSeconds > 0 || seconds > 0) && minutes === 0 && hours === 0 && digits > 0) {
    formattedString += `${seconds}.${deciSeconds}s`
  } else if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
    formattedString += `${seconds}s`
  }

  if (formattedString === '') {
    formattedString = '-'
  }

  return formattedString
}
