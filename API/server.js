require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

/* Middleware */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/* Routes */
app.use("/users", require("./routes/userRoutes"))
app.use("/posts", require("./routes/postRoutes"))
app.use("/tags", require("./routes/tagRoutes"))
app.use("/postTags", require("./routes/postTagRoutes"))
app.use("/posts/comments", require("./routes/postCommentRoutes"))

/* Default Routes */
app.use("/", (req, res) => res.json({ message: "Blog API" }))

app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
