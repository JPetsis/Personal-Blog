const postTagsDb = require("../models/postTagsDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

module.exports = {
  index(req, res, next) {
    postTagsDb
      .findAll()
      .then((postTags) => res.json({ data: postTags }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  getOne(req, res, next) {
    postTagsDb
      .findById(req.params.id)
      .then((postTag) => res.json({ data: postTag }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  getPostById(req, res, next) {
    postTagsDb
      .findPostById(req.params.id_posts)
      .then((postTags) => res.json({ data: postTags }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  save(req, res, next) {
    postTagsDb
      .findByPostId(req.body.id_posts)
      .then((postTags) => {
        if (postTags.map((el) => el.id_tags).includes(req.body.id_tags)) return res.sendStatus(200)
        else savePostTag()
      })
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return savePostTag()
        else next(err)
      })

    async function savePostTag() {
      postTagsDb
        .save(req.body)
        .then((postTag) => res.json({ data: postTag }))
        .catch((err) => next(err))
    }
  },
  update(req, res, next) {
    postTagsDb
      .update(req.body)
      .then((postTag) => res.json({ data: postTag }))
      .catch((err) => next(err))
  },
  delete(req, res, next) {
    postTagsDb
      .delete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch((err) => next(err))
  },
}
