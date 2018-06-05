import { helper } from '@ember/component/helper';

export function prettyPrintBytes([bytes]) {

  if (bytes <= 0) {
    return ""
  }

  var gigabytes = Math.floor(bytes/Math.pow(2, 30));
  var remainderForMegabytes = bytes % Math.pow(2, 30);
  var megabytes = Math.floor(remainderForMegabytes/Math.pow(2, 20));

  var formattedString = ""

  if (gigabytes > 0) {
    var decigigabytes = Math.floor(10*remainderForMegabytes/Math.pow(2, 30));
    formattedString += `${gigabytes}.${decigigabytes}GB`
  }
  if (megabytes > 0 && gigabytes == 0) {
    formattedString += `${megabytes}MB`
  }

  return formattedString
}

export default helper(prettyPrintBytes);
