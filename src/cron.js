import { CronJob } from "cron"

const TASKS = [
  { icon : 'book' },
  { icon : 'keyboard' }
]

module.exports = ( robot => {
  new CronJob('01 * * * *', () => {
    robot.adapter.client.web.chat.postMessage("#routine", "やった？", {as_user: true}).then(res => {
      TASKS.forEach( task => {
        robot.adapter.client.web.reactions.add(task.icon, {channel: res.channel, timestamp: res.ts})
      })
    })
  }).start()
})
