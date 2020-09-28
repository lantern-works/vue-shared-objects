export default async function Database(Vue, options) {
  // work within namespace
  const namespace = options.namespace || "_VSO_";

  //inspect data
  Gun.on("opt", function(ctx) {
    ctx.on("hi", function(msg) {
      console.debug(`[${namespace}] HI`, msg.url);
    });

    ctx.on("bye", function(msg) {
      console.debug(`[${namespace}] BYE`, msg);
    });

    ctx.on("in", function(msg) {
      //console.debug(`[${namespace}] IN`, msg);
      this.to.next(msg);
    });

    ctx.on("out", function(msg) {
      if (msg.dam && msg.dam == "hi") {
        return;
      }
      if (msg.hasOwnProperty("ok") && msg.ok === 1) {
        console.debug(`[${namespace}] SAVED`, msg);
      }
      this.to.next(msg);
    });
  });

  /*
   * Pull data and wait for reply
   */
  Gun.prototype.pull = async function(k) {
    return new Promise((resolve, reject) => {
      this.get(k).once((v,k) => {
            console.debug(`[${namespace}] PULL ${k} = `, v);
            resolve(k,v)
        });
    });
  };

  /*
   * Push data and wait for reply
   */
  Gun.prototype.push = async function(v) {
    return new Promise((resolve, reject) => {
      this.put(v)
        .once((v,k) => {
            console.debug(`[${namespace}] PUSH ${k} = `, v);
            resolve(v,k)
        });
    });
  };

  // namespace everything
  const db = Gun(options);

  // initiate root _all_ collection
  const root = db.get(namespace);
  const data = await root.pull("_all_");
  if (!data) {
    await root.get('_all_').push({});
  }
  return root;
}
