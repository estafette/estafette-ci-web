import formatDuration from './formatDuration'

export default function (pipeline, build, now) {
  if (!pipeline || !pipeline.extraInfo || !build || !build.buildStatus) {
    return ''
  }
  const status = build.buildStatus.toString().toLowerCase()
  if (status === 'pending') {
    if (pipeline.extraInfo.medianPendingDuration > 0 && build.insertedAt) {
      const pendingDurationNs = Math.pow(10, 6) * (now - new Date(build.insertedAt))
      const medianPendingDurationNs = pipeline.extraInfo.medianPendingDuration
      const pendingRatio = pendingDurationNs / medianPendingDurationNs
      if (pendingRatio >= 0.25) {
        const remainingPendingDurationNs = medianPendingDurationNs - pendingDurationNs
        if (remainingPendingDurationNs >= Math.pow(10, 9)) {
          return formatDuration(remainingPendingDurationNs, 0) + ' left'
        } else if (remainingPendingDurationNs <= -1 * Math.pow(10, 9)) {
          return formatDuration(-1 * remainingPendingDurationNs, 0) + ' over'
        }
      }
    }
    return ''
  }
  if (status === 'running') {
    if (pipeline.extraInfo.medianDuration > 0 && build.startedAt) {
      const durationNs = Math.pow(10, 6) * (now - new Date(build.startedAt))
      const medianDurationNs = pipeline.extraInfo.medianDuration
      const ratio = durationNs / medianDurationNs
      if (ratio >= 0.25) {
        const remainingDurationNs = medianDurationNs - durationNs
        if (remainingDurationNs >= Math.pow(10, 9)) {
          return formatDuration(remainingDurationNs, 0) + ' left'
        } else if (remainingDurationNs <= -1 * Math.pow(10, 9)) {
          return formatDuration(-1 * remainingDurationNs, 0) + ' over'
        }
      }
    }
    return ''
  }
  return ''
}
