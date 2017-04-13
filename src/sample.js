module.exports = ( robot => {
  robot.hear(/yeah/, msg => {
    msg.send("YEAR!!!")
  })
})
