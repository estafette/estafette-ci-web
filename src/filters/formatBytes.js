export default function (value) {
  if (!value) {
    return ''
  }

  if (value <= 0) {
    return ''
  }

  const gigabytes = Math.floor(value / Math.pow(2, 30))
  const remainderForMegabytes = value % Math.pow(2, 30)
  const megabytes = Math.floor(remainderForMegabytes / Math.pow(2, 20))

  let formattedString = ''

  if (gigabytes > 0) {
    const decigigabytes = Math.floor(10 * remainderForMegabytes / Math.pow(2, 30))
    formattedString += `${gigabytes}.${decigigabytes}GB`
  }
  if (megabytes > 0 && gigabytes === 0) {
    formattedString += `${megabytes}MB`
  }

  return formattedString
}
