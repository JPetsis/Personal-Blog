const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM users")
  },
  findById(id) {
    return db.one("SELECT * FROM users WHERE id = $1", id)
  },
  findByUsername(username) {
    return db.one("SELECT * FROM users WHERE username = $1", username)
  },
  save(user) {
    return db.one(
      `INSERT INTO users (username, password, created_at) 
      VALUES ($/username/, $/password/, $/created_at/)
      RETURNING *`,
      user
    )
  },
  update(user) {
    return db.one(
      `UPDATE users
      SET
      username = $/username/,
      password = $/password/,
      updated_at = $/updated_at/
      WHERE id = $/id/
      RETURNING *`,
      user
    )
  },
  delete(id) {
    return db.none("DELETE FROM users WHERE id = $1", id)
  },
}
