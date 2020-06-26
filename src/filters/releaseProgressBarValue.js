export default function (pipeline, release, now) {
  if (!pipeline || !pipeline.releaseTargets || !release || !release.releaseStatus) {
    return 100
  }
  var status = release.releaseStatus.toString().toLowerCase()

  var releaseTarget = pipeline.releaseTargets.find(rt => rt.name === release.name)
  if (!releaseTarget || !releaseTarget.activeReleases) {
    return 100
  }
  var activeRelease = releaseTarget.activeReleases.find(ar => ar.action === release.action)
  if (!activeRelease || !activeRelease.extraInfo) {
    return 100
  }

  if (status === 'pending') {
    if (activeRelease.extraInfo.medianPendingDuration > 0 && release.insertedAt) {
      var pendingDurationMs = now - new Date(release.insertedAt)
      var medianPendingDurationMs = activeRelease.extraInfo.medianPendingDuration / Math.pow(10, 6)
      var pendingValue = Math.round(100 * pendingDurationMs / medianPendingDurationMs)
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (activeRelease.extraInfo.medianDuration > 0 && release.startedAt) {
      var durationMs = now - new Date(release.startedAt)
      var medianDurationMs = activeRelease.extraInfo.medianDuration / Math.pow(10, 6)
      var value = Math.round(100 * durationMs / medianDurationMs)
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
