const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({success: false, error: 'Internal server error', message: err.message});
});

const server = app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

// Graceful shutdown for DB connection
function shutdown() {
  console.log('\nClosing SQLite database connection...');
  db.close((err) => {
    if (err) console.error('Error closing database:', err.message);
    else console.log('Database connection closed.');
    process.exit(0);
  });
}

// Handle SIGINT (Ctrl+C), SIGTERM (process kill)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
