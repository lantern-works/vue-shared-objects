export default function log(Vue, Vendor, options) {

  const winston = Vendor.winston;
  const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      // optional timestamping
      const ts = options.timestamps ? timestamp.slice(0, 19).replace('T', ' ') : '';
      
      let basicLevel = null;
      let obj = {}

      // skip colors in safari, since it does not play nicely...
      if (navigator) {
        let ua = navigator.userAgent.toLowerCase();

        if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
          basicLevel = level.substr(5, level.length-10);
        }

        // inspectable objects on console
        for (var idx in args) {
          obj[idx] = args[idx];
        }

        if (Object.keys(obj).length >= 1) {
          console.log(obj);
        }
      }

      let str = `${ts} [${basicLevel || level}]: ${message}`;
      if (obj) {
        str +=  ` {${Object.keys(obj)}}`
      }
      return str;
    }),
  );

  // Logger configuration
  const myCustomLevels = {
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      up: 6,
      down: 7,
      info: 8,
      debug: 9,
    },
    colors: {
      emerg: "red",
      alert: "red",
      crit: "red",
      error: "red",
      warning: "yellow",
      notice: "yellow",
      up: "cyan",
      down: "magenta",
      info: "green",
      debug: "yellow",
    },
  };

  const customLevelLogger = winston.createLogger({
    levels: myCustomLevels.levels
  });

  winston.addColors(myCustomLevels.colors);
  const logConfiguration = {
    levels: myCustomLevels.levels,
    transports: [
      new winston.transports.Console({ level: "debug", format: logFormat }),
    ],
  };

  // create the logger
  const logger = winston.createLogger(logConfiguration);

  // add static method for logging in Vue
  Vue.log = logger;
}
