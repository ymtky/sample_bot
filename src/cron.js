import { CronJob } from "cron"

const TASKS = [
  { icon : 'book' },
  { icon : 'english_reading' },
  { icon : 'keyboard' },
  { icon : 'octcat' },
  { icon : 'dusty_stick' }
]

const targetChannel = "#routine"
var lastTimeStamp = ""
var channelId = ""

module.exports = ( robot => {
  new CronJob('16 * * * *', () => {
    robot.adapter.client.web.chat.postMessage(targetChannel, "日課はやった？", {as_user: true}).then(res => {
      TASKS.forEach( task => {
        robot.adapter.client.web.reactions.add(task.icon, {channel: res.channel, timestamp: res.ts})
      })
      lastTimeStamp = res.ts
      channelId = res.channel
    })
  }).start()

  new CronJob('17 * * * *', () => {
    if (lastTimeStamp && channelId) {
      robot.adapter.client.web.reactions.get({channel: channelId, timestamp: lastTimeStamp}).then(res => {
        if (res.message.reactions.map(r => r.count).lastIndexOf(1) >= 0) {
          robot.send({room: res.channel}, "明日は頑張ろうね")
        }
      })
    }
  }).start()
})
