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
  robot.react( res => {
    robot.adapter.client.web.reactions.get({channel: res.message.item.channel, timestamp: res.message.item.ts}).then(res => {
      if (res.message.reactions.map(r => r.count).lastIndexOf(1) < 0) {
        robot.send({room: res.channel}, "よくやった！明日も頑張ろう！")
      }
    })
  })

  new CronJob('* 1 * * *', () => {
    robot.adapter.client.web.chat.postMessage(targetChannel, "日課はやった？", {as_user: true}).then(res => {
      TASKS.forEach( task => {
        robot.adapter.client.web.reactions.add(task.icon, {channel: res.channel, timestamp: res.ts})
      })
      lastTimeStamp = res.ts
      channelId = res.channel
    })
  }).start()

  new CronJob('* 3 * * *', () => {
    if (lastTimeStamp && channelId) {
      robot.adapter.client.web.reactions.get({channel: channelId, timestamp: lastTimeStamp}).then(res => {
        if (res.message.reactions.map(r => r.count).lastIndexOf(1) >= 0) {
          robot.send({room: res.channel}, "残念。明日は頑張ろうね")
        }
      })
    }
  }).start()
})
