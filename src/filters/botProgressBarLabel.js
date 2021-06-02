import formatDuration from './formatDuration'

export default function (pipeline, bot, now) {
  if (!pipeline || !pipeline.botTargets || !bot || !bot.botStatus) {
    return ''
  }
  const status = bot.botStatus.toString().toLowerCase()

  const botTarget = pipeline.botTargets.find(rt => rt.name === bot.name)
  if (!botTarget || !botTarget.activebots) {
    return ''
  }
  const activebot = botTarget.activebots.find(ar => ar.action === bot.action)
  if (!activebot || !activebot.extraInfo) {
    return ''
  }

  if (status === 'pending') {
    if (activebot.extraInfo.medianPendingDuration > 0 && bot.insertedAt) {
      const pendingDurationNs = Math.pow(10, 6) * (now - new Date(bot.insertedAt))
      const medianPendingDurationNs = activebot.extraInfo.medianPendingDuration
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
    if (activebot.extraInfo.medianDuration > 0 && bot.startedAt) {
      const durationNs = Math.pow(10, 6) * (now - new Date(bot.startedAt))
      const medianDurationNs = activebot.extraInfo.medianDuration
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
