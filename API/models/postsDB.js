const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM posts")
  },
  findById(id) {
    return db.one("SELECT * FROM posts WHERE id = $1", id)
  },
  findByTitle(title) {
    return db.one("SELECT * FROM posts WHERE title = $1", title)
  },
  save(post) {
    return db.one(
      `INSERT INTO posts (id_users, title, body, created_at) 
      VALUES ($/id_users/, $/title/, $/body/, $/created_at/)
      RETURNING *`,
      post
    )
  },
  update(post) {
    return db.one(
      `UPDATE posts
      SET
      id_users = $/id_users/,
      title = $/title/,
      body = $/body/,
      updated_at = $/updated_at/
      WHERE id = $/id/
      RETURNING *`,
      post
    )
  },
  delete(id) {
    return db.none("DELETE FROM posts WHERE id = $1", id)
  },
}
