export default {
  setTimeoutWithJitter (callback, seconds) {
    // add jitter to the timeout
    var max = 1000 * seconds * 0.75
    var min = 1000 * seconds * 1.25
    var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

    // set the timeout
    return setTimeout(callback, timeoutWithJitter)
  }
}
