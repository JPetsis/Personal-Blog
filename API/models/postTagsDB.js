const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM post_tags")
  },
  findById(id) {
    return db.one("SELECT * FROM post_tags WHERE id = $1", id)
  },
  findByPostId(id) {
    return db.many("SELECT * FROM post_tags WHERE id_posts = $1", id)
  },
  save(postTag) {
    return db.one(
      `INSERT INTO post_tags (id) 
      VALUES ($/id/)
      RETURNING *`,
      postTag
    )
  },
  update(postTag) {
    return db.one(
      `UPDATE post_tags
      SET
      id = $/id/,
      WHERE id = $/id/
      RETURNING *`,
      postTag
    )
  },
  delete(id) {
    return db.none("DELETE FROM post_tags WHERE id = $1", id)
  },
}
