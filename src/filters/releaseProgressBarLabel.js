import formatDuration from './formatDuration'

export default function (pipeline, release, now) {
  if (!pipeline || !pipeline.releaseTargets || !release || !release.releaseStatus) {
    return ''
  }
  const status = release.releaseStatus.toString().toLowerCase()

  const releaseTarget = pipeline.releaseTargets.find(rt => rt.name === release.name)
  if (!releaseTarget || !releaseTarget.activeReleases) {
    return ''
  }
  const activeRelease = releaseTarget.activeReleases.find(ar => ar.action === release.action)
  if (!activeRelease || !activeRelease.extraInfo) {
    return ''
  }

  if (status === 'pending') {
    if (activeRelease.extraInfo.medianPendingDuration > 0 && release.insertedAt) {
      const pendingDurationNs = Math.pow(10, 6) * (now - new Date(release.insertedAt))
      const medianPendingDurationNs = activeRelease.extraInfo.medianPendingDuration
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
    if (activeRelease.extraInfo.medianDuration > 0 && release.startedAt) {
      const durationNs = Math.pow(10, 6) * (now - new Date(release.startedAt))
      const medianDurationNs = activeRelease.extraInfo.medianDuration
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
