export default function Database(Vue, Vendor, options) {


   //inspect data
    Vendor.Gun.on("opt", function(ctx) {
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

    return Vendor.Gun(options);
}
   