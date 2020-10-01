import Item from './item.js';

export default class Collection {
    static database;

    constructor(id = 'all') {
        this._id = id;
        this._items = new Map();
        this._proxy = Array(); // must remain the same array for Vue
        this._node = Collection.database.get(this._id); // used for watching
        //console.log(`${this.label}`)
    }

    get label() {
        return 'collection-'+this._id;
    }

    async watch() {
       console.log(`${this.label}.watch`)
       this._node.once(async (v,k) => {
           if (v === undefined || v === null) {
               // create the filter automatically
               await this._node.push({})
           }

           this._node.map((v,k) => {
             if (this.isValid(v)) {
               console.log(`${this.label}.watch.once ? ${k} = `, this.nodeToJSON(v));
               this.register(v,k)
             }
           });
       })
    }

    nodeToJSON(v) {
        return Object.keys(v)
          .filter( key => key != '_' )
          .reduce( (res, key) => Object.assign(res, { [key]: v[key] }), {} );
    }


    /**
    * Alias for find
    */
    async findOne() {
      return this.find.apply(this,arguments);
    }

    /**
    * Fetches existing data from database
    */
    async find(item) {
      if (!item || !item.key) {
           console.log(`${this.label}.find: skip missing item`)
      }
        let search = await this._node.pull(item.key);
        if (search) {
           console.log(`${this.label}.find ? ${item.key} = ` , search)
        }
        return search;
    }

    /**
    * Fetches all items of a type from database
    * @todo Finish this...
    */
    async findMany(type) {
      this._items.forEach(item => {
        console.log(item);
      })
    }


    /**
    * Saves the item in database
    * Registration happens only based on listener
    */
    async save(item) {

       if (!this.isValid(item)) {
           console.log(`${this.label}: skipping save of invalid item` , item) 
       }
       // does item exist already?
       let existing = await this.findOne(item);
       console.log(`${this.label}.save ? skip save since ${item.key} exists...`, item)

       if (existing) return;
       let result = this._node.get(item.key).push(item.value);
       console.log(`${this.label}.save? ${item.key} saved:`, item)
       return result;
    }

    /**
    * Removes object from database
    * Unregistration happens only based on listener
    */
    async remove(remove) {
       if (!item || !item.key) {
           console.log(`${this.label}: skip remove ` , item)
       }
       console.log(`${this.label}.remove.${item.key}`)
       await this._node.get(item.key).push({
         type: item.type, 
         id: item.id, 
         _deleted: true
       });
    }

    /**
    * Checks if item properties are valid and as expected
    */
    isValid(obj) {
      if (typeof(obj) !== 'object') {
        return;
      }
      let data = null;
      if (obj.constructor.name == 'Object') {
        // it is an Item
        data = this.nodeToJSON(obj);
      }
      else {
        data = obj.value;
      }

      if (!data.id || !data.type) {
         return false;
      }
      return true;
    }

    /**
    * Converts JSON into Item and links to this collection
    */
    register(v,k) {
        console.log("REGISTER", v,k)
        // only allow if we have a type
        try {
            if (!this.isValid(v)) {
              throw new Error(`Invalid item value ${JSON.stringify(v)}`)
            }
            let key = [v.type, v.id].join('-');
            if (key != k) {
              throw new Error(`Expected key ${key} but found ${k}`)
            }
        }
        catch(e) {
            console.warn(e)
            return;
        }


        // skip existing items
        if (this._items.has(k)) {
            console.log(`${this.label}: skip register: existing: ${k}`)
            return;
        }
          console.log(`${this.label}.register: ${k}`)
          const item = new Item(v);
          this._items.set(k, item)
          this._proxy.push(item);
    }

    /**
    * Unlinks Item from this collection
    */
    unregister(k) {
        // skip non-existing items
        if (!this._items.has(k)) {
            console.log(`${this.label}: skip unregister: missing: ${k}`)
            return;
        }
        console.log(`${this.label}: unregister: ${k}`)
        this._items.delete(k);
        // remove from proxy
    }

    get id() {
        return this._id;
    }

    get all() {
        return this._proxy;
    }
}