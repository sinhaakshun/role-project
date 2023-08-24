const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const logUtils = require('../utils/logUtils');

const router = express.Router();

//router.use(authMiddleware);

router.get('/logs',authMiddleware , (req, res) => {
  try {
    const requestingUser = req.user;
    if (requestingUser.role !== 'Super Admin') {
      return res.json({ error: 'Access forbidden' });
    }

    const logsDir = path.join(__dirname, '..', 'logs');
    const logFiles = fs.readdirSync(logsDir);

    if (logFiles.length === 0) {
      return res.json({ error: 'No logs available' });
    }

    const mostRecentLogFile = logFiles.pop();
    const logFilePath = path.join(logsDir, mostRecentLogFile);
    const logs = fs.readFileSync(logFilePath, 'utf-8');

    // Calling the writeLog function to log this action
    logUtils.writeLog(`Super Admin accessed logs at ${new Date().toISOString()}`);

    res.json({ logs });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Internal server error' });
  }
});

module.exports = router;
