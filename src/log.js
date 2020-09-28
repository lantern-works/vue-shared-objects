export default function log(Vue, Vendor, options) {

  const winston = Vendor.winston;

  // Colorize
  const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
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
      notice: "black",
      up: "green",
      down: "blue",
      info: "magenta",
      debug: "cyan",
    },
  };

  const customLevelLogger = winston.createLogger({
    levels: myCustomLevels.levels,
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
