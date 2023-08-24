const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const logFileDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
const logFileInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

const createLogFile = () => {
  const currentTime = new Date().getTime();
  const logFileName = `log_${currentTime}.txt`;
  return path.join(logsDir, logFileName);
};

const writeLog = (logData) => {
  const logFilePath = createLogFile();
  fs.writeFileSync(logFilePath, logData, { flag: 'w' });
};

const cleanOldLogs = () => {
  const currentTime = new Date().getTime();

  fs.readdirSync(logsDir).forEach((file) => {
    const filePath = path.join(logsDir, file);
    const fileStats = fs.statSync(filePath);

    if (currentTime - fileStats.birthtimeMs > logFileDuration) {
      fs.unlinkSync(filePath);
    }
  });
};

// Schedule a task to create a new log file every 5 minutes
setInterval(() => {
  createLogFile();
}, logFileInterval);

// Schedule a task to clean up old log files
setInterval(cleanOldLogs, 60 * 60 * 1000); // Run every hour

module.exports = {
  writeLog,
};
