const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM tags")
  },
  findById(id) {
    return db.one("SELECT * FROM tags WHERE id = $1", id)
  },
  findByName(name) {
    return db.one("SELECT * FROM tags WHERE name = $1", name)
  },
  save(tag) {
    return db.one(
      `INSERT INTO tags (id, name) 
      VALUES ($/id/, $/name/)
      RETURNING *`,
      tag
    )
  },
  update(tag) {
    return db.one(
      `UPDATE tags
      SET
      name = $/name/
      WHERE id = $/id/
      RETURNING *`,
      tag
    )
  },
  delete(id) {
    return db.none("DELETE FROM tags WHERE id = $1", id)
  },
}
