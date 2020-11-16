const express = require("express")
const postTagsController = require("../controllers/postTagsController")
const postTagsRouter = express.Router()

postTagsRouter
  .route("/")
  .get(postTagsController.index)
  .post(postTagsController.save)
  .put(postTagsController.update)

postTagsRouter.route("/id/:id").get(postTagsController.getOne).delete(postTagsController.delete)

postTagsRouter.route("/post/id/:id_posts").get(postTagsController.getByPostId)

module.exports = postTagsRouter
