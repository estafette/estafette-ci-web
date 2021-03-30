export default function (pipeline, build, now) {
  if (!pipeline || !pipeline.extraInfo || !build || !build.buildStatus) {
    return 100
  }
  const status = build.buildStatus.toString().toLowerCase()
  if (status === 'pending') {
    if (pipeline.extraInfo.medianPendingDuration > 0 && build.insertedAt) {
      const pendingDurationMs = now - new Date(build.insertedAt)
      const medianPendingDurationMs = pipeline.extraInfo.medianPendingDuration / Math.pow(10, 6)
      const pendingValue = Math.round(100 * pendingDurationMs / medianPendingDurationMs)
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (pipeline.extraInfo.medianDuration > 0 && build.startedAt) {
      const durationMs = now - new Date(build.startedAt)
      const medianDurationMs = pipeline.extraInfo.medianDuration / Math.pow(10, 6)
      const value = Math.round(100 * durationMs / medianDurationMs)
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
