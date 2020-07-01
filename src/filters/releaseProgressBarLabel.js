import formatDuration from './formatDuration'

export default function (pipeline, release, now) {
  if (!pipeline || !pipeline.releaseTargets || !release || !release.releaseStatus) {
    return ''
  }
  var status = release.releaseStatus.toString().toLowerCase()

  var releaseTarget = pipeline.releaseTargets.find(rt => rt.name === release.name)
  if (!releaseTarget || !releaseTarget.activeReleases) {
    return ''
  }
  var activeRelease = releaseTarget.activeReleases.find(ar => ar.action === release.action)
  if (!activeRelease || !activeRelease.extraInfo) {
    return ''
  }

  if (status === 'pending') {
    if (activeRelease.extraInfo.medianPendingDuration > 0 && release.insertedAt) {
      var pendingDurationNs = Math.pow(10, 6) * (now - new Date(release.insertedAt))
      var medianPendingDurationNs = activeRelease.extraInfo.medianPendingDuration
      var pendingRatio = pendingDurationNs / medianPendingDurationNs
      if (pendingRatio >= 0.25) {
        var remainingPendingDurationNs = medianPendingDurationNs - pendingDurationNs
        if (remainingPendingDurationNs > 0) {
          return formatDuration(remainingPendingDurationNs, 0) + ' left'
        } else if (remainingPendingDurationNs < 0) {
          return formatDuration(-1 * remainingPendingDurationNs, 0) + ' over'
        }
      }
    }
    return ''
  }
  if (status === 'running') {
    if (activeRelease.extraInfo.medianDuration > 0 && release.startedAt) {
      var durationNs = Math.pow(10, 6) * (now - new Date(release.startedAt))
      var medianDurationNs = activeRelease.extraInfo.medianDuration
      var ratio = durationNs / medianDurationNs
      if (ratio >= 0.25) {
        var remainingDurationNs = medianDurationNs - durationNs
        if (remainingDurationNs > 0) {
          return formatDuration(remainingDurationNs, 0) + ' left'
        } else if (remainingDurationNs < 0) {
          return formatDuration(-1 * remainingDurationNs, 0) + ' over'
        }
      }
    }
    return ''
  }
  return ''
}
