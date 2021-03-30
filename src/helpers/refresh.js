export default {
  setTimeoutWithJitter (commit, callback, seconds) {
    // cancel any previous timeouts
    commit('cancelTimeouts')

    // add jitter to the timeout
    const max = 1000 * seconds * 0.75
    const min = 1000 * seconds * 1.25
    const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

    // set the timeout
    const timeout = setTimeout(callback, timeoutWithJitter)

    // store timeout, to be able to cancel it later
    commit('setTimeout', timeout)
  },
  timeoutWithJitter (timeout, callback, seconds) {
    clearTimeout(timeout)

    // add jitter to the timeout
    const max = 1000 * seconds * 0.75
    const min = 1000 * seconds * 1.25
    const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

    // set the timeout
    timeout = setTimeout(callback, timeoutWithJitter)
  },
  timeout (timeout, callback, seconds) {
    clearTimeout(timeout)

    // set the timeout
    timeout = setTimeout(callback, 1000 * seconds)
  }
}
