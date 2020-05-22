import moment from 'moment'
import 'moment/locale/en-il'

moment.locale('en-il')

export default function (value) {
  if (value === null) {
    return ''
  }

  if (!moment(value).isSame(moment(), 'year')) {
    return moment(value).format('D MMM YYYY [at] H:mm')
  }

  if (!moment(value).isSame(moment(), 'day')) {
    return moment(value).format('D MMM [at] H:mm')
  }

  // other day
  return moment(value).format('[today] [at] H:mm')
}
