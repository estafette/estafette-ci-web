import moment from 'moment'
import 'moment/locale/en-il'

moment.locale('en-il')

export default function (value, format) {
  return moment(value).format(format)
}
