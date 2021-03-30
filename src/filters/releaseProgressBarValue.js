export default function (pipeline, release, now) {
  if (!pipeline || !pipeline.releaseTargets || !release || !release.releaseStatus) {
    return 100
  }
  const status = release.releaseStatus.toString().toLowerCase()

  const releaseTarget = pipeline.releaseTargets.find(rt => rt.name === release.name)
  if (!releaseTarget || !releaseTarget.activeReleases) {
    return 100
  }
  const activeRelease = releaseTarget.activeReleases.find(ar => ar.action === release.action)
  if (!activeRelease || !activeRelease.extraInfo) {
    return 100
  }

  if (status === 'pending') {
    if (activeRelease.extraInfo.medianPendingDuration > 0 && release.insertedAt) {
      const pendingDurationMs = now - new Date(release.insertedAt)
      const medianPendingDurationMs = activeRelease.extraInfo.medianPendingDuration / Math.pow(10, 6)
      const pendingValue = Math.round(100 * pendingDurationMs / medianPendingDurationMs)
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (activeRelease.extraInfo.medianDuration > 0 && release.startedAt) {
      const durationMs = now - new Date(release.startedAt)
      const medianDurationMs = activeRelease.extraInfo.medianDuration / Math.pow(10, 6)
      const value = Math.round(100 * durationMs / medianDurationMs)
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
