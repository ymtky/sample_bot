import { CronJob } from "cron"

const TASKS = [
  { icon : 'book' }
]

module.exports = ( robot => {
  new CronJob('43 * * * *', function() {
    robot.adapter.client.web.chat.postMessage("#routine", "やった？", {as_user: true}).then(function(res) {
      TASKS.map(function(task) {
        robot.adapter.client.web.reactions.add(task.icon, {channel: res.channel, timestamp: res.ts})
      })
    })
  }).start()
})
