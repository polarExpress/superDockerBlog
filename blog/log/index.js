/*
* Terminal logs middleware
*/

var logger = {};

function pad(num) {
  num = num.toString();

  if (num.length === 1) {
    num = '0' + num;
  }

  return num;
}

function createDateString() {
  var now = new Date(Date.now());

  return [
    now.getFullYear(),
    '-',
    pad(now.getMonth() + 1),
    '-',
    pad(now.getDate()),
    ' ',
    pad(now.getHours()),
    ':',
    pad(now.getMinutes()),
    ':',
    pad(now.getSeconds())
  ].join('');
}

function sendLog(level, args) {
  if (arguments.length < 2) {
    throw new Error('sendLog needs at least two parameters.');
  }

  var consoleArgs = ['[' + createDateString() + ']', level];

  for (var i = 0; i < args.length; i++) {
    consoleArgs.push(args[i]);
  }

  console.log.apply(console, consoleArgs);
}

logger.debug = function(message) {
  sendLog("DEBUG", arguments);
};

logger.info = function(message) {
  sendLog("INFO", arguments);
};

logger.warn = function(message) {
  sendLog("WARN", arguments);
};

logger.error = function(message) {
  sendLog("ERROR", arguments);
};

logger.fatal = function(message) {
  sendLog("FATAL", arguments);
};

module.exports = logger;
