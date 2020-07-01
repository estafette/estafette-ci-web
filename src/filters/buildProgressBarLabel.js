import formatDuration from './formatDuration'

export default function (pipeline, build, now) {
  if (!pipeline || !pipeline.extraInfo || !build || !build.buildStatus) {
    return ''
  }
  var status = build.buildStatus.toString().toLowerCase()
  if (status === 'pending') {
    if (pipeline.extraInfo.medianPendingDuration > 0 && build.insertedAt) {
      var pendingDurationNs = Math.pow(10, 6) * (now - new Date(build.insertedAt))
      var medianPendingDurationNs = pipeline.extraInfo.medianPendingDuration
      var pendingRatio = pendingDurationNs / medianPendingDurationNs
      if (pendingRatio >= 0.25) {
        var remainingPendingDurationNs = medianPendingDurationNs - pendingDurationNs
        if (remainingPendingDurationNs > 0) {
          return formatDuration(remainingPendingDurationNs, 0) + ' left'
        }

        return formatDuration(-1 * remainingPendingDurationNs, 0) + ' over'
      }
    }
    return ''
  }
  if (status === 'running') {
    if (pipeline.extraInfo.medianDuration > 0 && build.startedAt) {
      var durationNs = Math.pow(10, 6) * (now - new Date(build.startedAt))
      var medianDurationNs = pipeline.extraInfo.medianDuration
      var ratio = durationNs / medianDurationNs
      if (ratio >= 0.25) {
        var remainingDurationNs = medianDurationNs - durationNs
        if (remainingDurationNs > 0) {
          return formatDuration(remainingDurationNs, 0) + ' left'
        }

        return formatDuration(-1 * remainingDurationNs, 0) + ' over'
      }
    }
    return ''
  }
  return ''
}
