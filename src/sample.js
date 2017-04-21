module.exports = ( robot => {
  robot.react( res => {
    robot.adapter.client.web.reactions.get({channel: res.message.item.channel, timestamp: res.message.item.ts}).then(res => {
      if (res.message.reactions.map(r => r.count).lastIndexOf(1) < 0) {
        robot.send({room: res.channel}, "よくやった！明日も頑張ろう！")
      }
    })
  })
})
