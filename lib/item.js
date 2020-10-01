export default class Item {

    static TYPE = 'item';
    
    static TYPES = {
    }

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
            this.type = v.type || Item.TYPE;
            this.value = v;
            this.id = v.id;

        }
        catch(e) {
            console.warn(e)
            return;
        }
    }

    get key() {
        if (this.type && this.id) {
            return [this.type,this.id].join('-');
        }
        return null;
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