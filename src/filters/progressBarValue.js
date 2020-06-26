export default function (pipeline, build, now) {
  if (!pipeline || !pipeline.extraInfo || !build || !build.buildStatus) {
    return 100
  }
  var status = build.buildStatus.toString().toLowerCase()
  if (status === 'pending') {
    if (pipeline.extraInfo.medianPendingDuration > 0 && build.startedAt) {
      var pendingDuration = now - new Date(build.startedAt)
      var pendingValue = Math.round(100 * pendingDuration / pipeline.extraInfo.medianPendingDuration / Math.pow(10, 6))
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (pipeline.extraInfo.medianDuration > 0 && build.startedAt) {
      var duration = now - new Date(build.startedAt)
      if (build.pendingDuration > 0) {
        duration -= build.pendingDuration / Math.pow(10, 6)
      }
      var value = Math.round(100 * duration / pipeline.extraInfo.medianDuration / Math.pow(10, 6))
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
