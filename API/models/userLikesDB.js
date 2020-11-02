const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM user_likes")
  },
  findById(id) {
    return db.one("SELECT * FROM user_likes WHERE id = $1", id)
  },
  findByUserIdAndPostId(data) {
    return db.one(
      "SELECT * FROM user_likes WHERE id_users = $/id_users/ AND id_posts = $/id_posts/",
      data
    )
  },
  findAmountByPostId(id) {
    return db.one("SELECT COUNT(*) FROM user_likes WHERE id_posts = $1", id)
  },
  save(userLike) {
    return db.one(
      `INSERT INTO user_likes (id, id_posts, id_users) 
      VALUES ($/id/, $/id_posts/, $/id_users/)
      RETURNING *`,
      userLike
    )
  },
  delete(id) {
    return db.none("DELETE FROM user_likes WHERE id = $1", id)
  },
}
