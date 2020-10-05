export default function Database(Vue, options) {
  const label = 'db';
  
  //inspect data
  Gun.on("opt", function(ctx) {
    ctx.on("hi", function(msg) {
      //console.debug(`${label} HI`, msg.url);
    });

    ctx.on("bye", function(msg) {
      //console.debug(`${label} BYE`, msg.url);
    });

    ctx.on("in", function(msg) {
      //console.debug(`${label} IN`, msg);
      this.to.next(msg);
    });

    ctx.on("out", function(msg) {
      if (msg.dam && msg.dam == "hi") {
        return;
      }
      if (msg.hasOwnProperty("ok") && msg.ok === 1) {
        //console.debug(`${label} SAVED`, msg);
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
            // console.debug(`${label} PULL ${k} = `, v);
            resolve(v)
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
            //console.debug(`${label} PUSH ${k} = `, v);
            resolve(v)
        });
    });
  };

  const db = Gun(options);
  return db;
}
