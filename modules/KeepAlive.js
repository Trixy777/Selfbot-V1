const app = require("express")();
const { info } = require("../data/logger")

app.get("/", (req, res) => {
  res.send("ayo wassup")
})

app.listen(8080, () => {
  info("Keep Alive Server Started")
})