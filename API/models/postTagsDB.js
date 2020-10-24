const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM post_tags")
  },
  findById(id) {
    return db.one("SELECT * FROM post_tags WHERE id = $1", id)
  },
  findByPostId() {
    return db.many("SELECT * FROM post_tags WHERE id_posts = $1", id)
  },
}
