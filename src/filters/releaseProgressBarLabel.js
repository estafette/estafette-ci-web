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

      var remainingPendingDurationNs = medianPendingDurationNs - pendingDurationNs
      if (remainingPendingDurationNs > 0) {
        return formatDuration(remainingPendingDurationNs) + ' remaining'
      }

      return formatDuration(-1 * remainingPendingDurationNs) + ' over time'
    }
    return ''
  }
  if (status === 'running') {
    if (activeRelease.extraInfo.medianDuration > 0 && release.startedAt) {
      var durationNs = Math.pow(10, 6) * (now - new Date(release.startedAt))
      var medianDurationNs = activeRelease.extraInfo.medianDuration

      var remainingDurationNs = medianDurationNs - durationNs
      if (remainingDurationNs > 0) {
        return formatDuration(remainingDurationNs) + ' remaining'
      }

      return formatDuration(-1 * remainingDurationNs) + ' over time'
    }
    return ''
  }
  return ''
}
