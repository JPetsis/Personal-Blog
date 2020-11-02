const userLikesDb = require("../models/userLikesDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

module.exports = {
  index(req, res, next) {
    userLikesDb
      .findAll()
      .then((userViews) => res.json({ data: userLikes }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  getOne(req, res, next) {
    userLikesDb
      .findById(req.params.id)
      .then((post) => getPostLikes(post))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })

    function getPostLikes(post) {
      userLikesDB
        .findAmountByPostId(req.params.id)
        .then((userLikes) => sendResponse(post, userLikes))
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
  getByPostId(req, res, next) {
    userLikesDb
      .findByPostId(req.params.id_posts)
      .then((userLikes) => res.json({ data: userLikes }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  save(req, res, next) {
    userLikesDB
      .findByUserIdAndPostId({ id_posts: req.body.id_posts, id_users: req.body.id_users })
      .then(() => res.sendStatus(200))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return saveNewPostLike()
        else next(err)
      })

    function saveNewPostLike() {
      userLikesDB
        .save(req.body)
        .then((postLike) => res.json({ data: postLike }))
        .catch((err) => next(err))
    }
  },
  delete(req, res, next) {
    userLikesDB
      .delete(req.params.id)
      .then(() => res.json({ message: "Like Deleted" }))
      .catch((err) => next(err))
  },
}
