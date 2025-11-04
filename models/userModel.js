const db = require('../config/db');

exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users ORDER BY createdAt DESC', [], callback);
};

exports.getUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
};

exports.createUser = (name, email, callback) => {
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    callback(err, { id: this.lastID, name, email, createdAt: new Date().toISOString() });
  });
};

exports.updateUser = (id, name, email, callback) => {
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
    callback(err, this.changes);
  });
};

exports.deleteUser = (id, callback) => {
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    callback(err, this.changes);
  });
};
