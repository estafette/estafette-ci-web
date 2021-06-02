export default function (pipeline, bot, now) {
  if (!pipeline || !pipeline.botTargets || !bot || !bot.botStatus) {
    return 100
  }
  const status = bot.botStatus.toString().toLowerCase()

  const botTarget = pipeline.botTargets.find(rt => rt.name === bot.name)
  if (!botTarget || !botTarget.activebots) {
    return 100
  }
  const activebot = botTarget.activebots.find(ar => ar.action === bot.action)
  if (!activebot || !activebot.extraInfo) {
    return 100
  }

  if (status === 'pending') {
    if (activebot.extraInfo.medianPendingDuration > 0 && bot.insertedAt) {
      const pendingDurationMs = now - new Date(bot.insertedAt)
      const medianPendingDurationMs = activebot.extraInfo.medianPendingDuration / Math.pow(10, 6)
      const pendingValue = Math.round(100 * pendingDurationMs / medianPendingDurationMs)
      if (pendingValue >= 0 && pendingValue <= 100) {
        return pendingValue
      }
    }
    return 100
  }
  if (status === 'running') {
    if (activebot.extraInfo.medianDuration > 0 && bot.startedAt) {
      const durationMs = now - new Date(bot.startedAt)
      const medianDurationMs = activebot.extraInfo.medianDuration / Math.pow(10, 6)
      const value = Math.round(100 * durationMs / medianDurationMs)
      if (value >= 0 && value <= 100) {
        return value
      }
    }
    return 100
  }
  return 100
}
