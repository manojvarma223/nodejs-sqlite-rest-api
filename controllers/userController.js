const userModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, rows) => {
    if (err)
      return res.status(500).json({ success: false, error: 'Database error', message: err.message });
    res.json({ success: true, data: rows });
  });
};

exports.getUserById = (req, res) => {
  userModel.getUserById(req.params.id, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, error: 'Database error', message: err.message });
    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  userModel.createUser(name, email, (err, newUser) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed'))
        return res.status(409).json({ success: false, error: 'Email already exists' });
      return res.status(500).json({ success: false, error: 'Database error', message: err.message });
    }
    res.status(201).json({ success: true, data: newUser });
  });
};

exports.updateUser = (req, res) => {
  const { name, email } = req.body;
  userModel.updateUser(req.params.id, name, email, (err, changes) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed'))
        return res.status(409).json({ success: false, error: 'Email already exists' });
      return res.status(500).json({ success: false, error: 'Database error', message: err.message });
    }
    if (!changes) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, message: 'User updated' });
  });
};

exports.deleteUser = (req, res) => {
  userModel.deleteUser(req.params.id, (err, changes) => {
    if (err)
      return res.status(500).json({ success: false, error: 'Database error', message: err.message });
    if (!changes) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  });
};
