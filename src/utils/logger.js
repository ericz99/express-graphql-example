import dateFormat from 'dateformat';
import colors from 'colors';

const Logger = function Logger(type) {
  this._type = type;
};

Logger.prototype.green = function success(message) {
  console.log(`${getDateString()} [${this._type}] ` + colors.green('[+] ' + message));
};

Logger.prototype.red = function error(message) {
  console.log(`${getDateString()} [${this._type}] ` + colors.red('[x] ' + message));
};

Logger.prototype.blue = function won(message) {
  console.log(`${getDateString()} [${this._type}] ` + colors.blue('[$] ' + message));
};

Logger.prototype.normal = function info(message) {
  console.log(`${getDateString()} [${this._type}] [#] ${message}`);
};

Logger.prototype.yellow = function caution(message) {
  console.log(`${getDateString()} [${this._type}] ` + colors.yellow('[?] ' + message));
};

function getDateString() {
  return '[' + dateFormat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT') + ']';
}

export default type => {
  return new Logger(type);
};
