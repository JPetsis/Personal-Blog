const postsDB = require("../models/postsDB")

module.exports = {
  index(req, res, next) {
    postsDB
      .findAll()
      .then((posts) => res.json({ message: "Getting Posts", data: posts }))
      .catch((err) => next(err))
  },
  getOne(req, res, next) {
    postsDB
      .findById(req.params.id)
      .then((post) => res.json({ message: "Getting Post", data: post }))
      .catch((err) => next(err))
  },
  getByTitle(req, res, next) {
    postsDB
      .findByTitle(req.params.title)
      .then((post) => res.json({ message: "Getting post by title", data: post }))
      .catch((err) => next(err))
  },
  create(req, res, next) {
    postsDB
      .save(req.body)
      .then((post) => res.json({ message: "Adding Post", data: post }))
      .catch((err) => next(err))
  },
  update(req, res, next) {
    postsDB
      .update(req.body)
      .then((post) => res.json({ message: "Updating Post", data: post }))
      .catch((err) => next(err))
  },
  delete(req, res, next) {
    postsDB
      .delete(req.params.id)
      .then(() => res.json({ message: "Post Deleted" }))
      .catch((err) => next(err))
  },
}
