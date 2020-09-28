export default function Database(Vue, Vendor, options) {

   //inspect data
    Gun.on("opt", function(ctx) {
      ctx.on("hi", function(msg) {
        console.debug('HI', msg);
      });

      ctx.on("bye", function(msg) {
        console.debug('BYE', msg);
      });

      ctx.on("in", function(msg) {
        console.debug('IN', msg);
        this.to.next(msg);
      });

      ctx.on("out", function(msg) {
        console.debug('OUT', msg);
        this.to.next(msg);
      });
    });

    return Gun(options);
}
   