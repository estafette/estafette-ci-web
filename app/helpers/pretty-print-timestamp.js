import { helper } from '@ember/component/helper';

export function prettyPrintTimestamp([timespan]) {

  if (timespan <= 0) {
    return ""
  }

  var hours = Math.floor(timespan/(3600*Math.pow(10, 9)));
  var remainderForMinutes = timespan % (3600*Math.pow(10, 9));
  var minutes = Math.floor(remainderForMinutes/(60*Math.pow(10, 9)));
  var remainderForSeconds = remainderForMinutes % (60*Math.pow(10, 9));
  var seconds = Math.floor(remainderForSeconds/Math.pow(10, 9));
  var remainderForMilliseconds = remainderForSeconds % Math.pow(10, 9);

  var formattedString = ""

  if (hours > 0) {
    formattedString += `${hours}h`
  }
  if (minutes > 0 || hours > 0) {
    formattedString += `${minutes}m`
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
    formattedString += `${seconds}s`
  }

  return formattedString
}

export default helper(prettyPrintTimestamp);
