const postsDB = require("../models/postsDB")
const userViewsDb = require("../models/userViewsDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

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
      .then((post) => getPostViews(post))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })

    function getPostViews(post) {
      userViewsDB
        .findAmountByPostId(req.params.id)
        .then((userViews) => sendResponse(post, userViews))
        .catch((err) => {
          if (err instanceof QRE && err.code === qrec.noData) return sendResponse(post, 0)
          else next(err)
        })

      function sendResponse(post, viewAmount) {
        post.viewAmount = viewAmount
        res.json({ data: post })
      }
    }
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
