require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("<h1>Welcome!!</h1>")
})

app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
