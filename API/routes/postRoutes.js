const express = require("express")
const postsController = require("../controllers/postsController")
const postsRouter = express.Router()

postsRouter
  .route("/")
  .get(postsController.index)
  .post(postsController.create)
  .put(postsController.update)

postsRouter.route("/id/:id").get(postsController.getOne).delete(postsController.delete)

postsRouter.route("/title/:title").get(postsController.getByTitle)

module.exports = postsRouter
