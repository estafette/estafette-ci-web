export default {
  setTimeoutWithJitter (commit, callback, seconds) {
    // cancel any previous timeouts
    commit('cancelTimeouts')

    // add jitter to the timeout
    var max = 1000 * seconds * 0.75
    var min = 1000 * seconds * 1.25
    var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

    // set the timeout
    var timeout = setTimeout(callback, timeoutWithJitter)

    // store timeout, to be able to cancel it later
    commit('setTimeout', timeout)
  }
}
