class Item {

    static register(cls) {
      Item.TYPES[cls.TYPE] = cls;
    }

    static unregister(cls) {
        delete Item.TYPES[cls.TYPE];
    }

    constructor(v) {
        if (!v) {
            console.debug(`@item skip construct: missing id or value`)
            return;
        }
        try {
            if (!v.id) {
                throw new Error(`Missing ID for item ${JSON.stringify(v)}`);
            }

            if (v.type && Item.TYPES[v.type]) {
                if (this.constructor.name == 'Item') {
                    return new Item.TYPES[v.type](v);
                }
            }

            v.type = v.type || this.constructor.TYPE;

            this.value = v;

        }
        catch(e) {
            console.warn(e)
            return;
        }
    }


    get id() {
        return this.value.id;
    }

    get type() {
        return this.value.type
    }

    get key() {
        if (this.type && this.id) {
            return [this.type,this.id].join('-');
        }
        return null;
    }

    get deleted() {
        return this.value.hasOwnProperty('_deleted') && this.value._deleted === true;
    }


    /**
    * Refreshes local instance from database
    */
    refresh(v) {
       console.log(`${this.id} refresh`, v)
      // let filtered = Object.keys(item.value)
      //     .filter( key => key != '_' )
      //     .reduce( (res, key) => Object.assign(res, { [key]: item.value[key] }), {} );

      //   for (var idx in filtered) {
      //       item._value[idx] = filtered[idx];
      //   }
      //   console.log(`${item.key} refreshed`, filtered);
    }


    log() {
        console.log(this);
    }

    toJSON() {
        if (!this.value) return null;
        return Object.keys(this.value)
          .filter( key => key != '_' )
          .reduce( (res, key) => Object.assign(res, { [key]: this.value[key] }), {} );
    }
}

Item.TYPES = {};
Item.TYPE = 'item';    

export default Item