module.exports = function (req, res, next) {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  if (name.trim().length === 0)
    return res.status(400).json({ success: false, error: 'Name cannot be empty' });
  next();
};
