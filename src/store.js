const Gun = require("gun");
const GunUnset = require("gun/lib/unset.js");
const GunOpen = require("gun/lib/open.js");

module.exports = function Database(Vue, options) {

   //inspect data
    Gun.on("opt", function(ctx) {
      ctx.on("hi", function(msg) {
        Vue.log.info('HI', msg);
      });

      ctx.on("bye", function(msg) {
        Vue.log.info('BYE', msg);
      });

      ctx.on("in", function(msg) {
        Vue.log.down('IN', msg);
        this.to.next(msg);
      });

      ctx.on("out", function(msg) {
        Vue.log.up('OUT', msg);
        this.to.next(msg);
      });
    });

    return Gun(options);
}