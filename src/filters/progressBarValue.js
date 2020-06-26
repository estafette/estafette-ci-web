export default function (pipeline, build, now) {
  if (!pipeline || !pipeline.extraInfo || !build || !build.status) {
    return 100
  }
  var status = build.status.toString().toLowerCase()
  if (status === 'pending') {
    if (pipeline.extraInfo.medianPendingDuration > 0 && build.startedAt > 0) {
      var pendingDuration = Math.pow(10, 6) * (now - build.startedAt)
      var pendingValue = Math.round(100 * pendingDuration / pipeline.extraInfo.medianPendingDuration)
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (pipeline.extraInfo.medianDuration > 0 && build.startedAt > 0) {
      var duration = Math.pow(10, 6) * (now - build.startedAt)
      if (build.pendingDuration > 0) {
        duration -= build.pendingDuration
      }
      var value = Math.round(100 * duration / pipeline.extraInfo.medianDuration)
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
