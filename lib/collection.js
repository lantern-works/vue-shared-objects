import Item from './item.js';
 class Collection {

    constructor(id = 'all') {
        this._id = id;
        this._items = new Array();
        this._map = new Map(); // must remain the same array for Vue
        this._node = Collection.DB.get(this._id); // used for watching
        //console.log(`${this.label}`)
    }

    get label() {
        return ':collection';
    }

    async watch() {
       //console.log(`${this.label}.watch`)
       this._node.once(async (v,k) => {
           if (v === undefined || v === null) {
               // create the filter automatically
               await this._node.push({})
           }

           this._node.map((v,k) => {

             if (this.isValid(v)) {
                // skip existing items
                if (this._map.has(k)) {
                  return;
                }
                else {
                 // console.debug(`${this.label}.watch.once ? ${k} = `, this.nodeToJSON(v));
                 this.register(v,k)
                }
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
           return;
      }
      let search = await this._node.pull(item.key);
      if (search) {
         //  console.log(`${this.label} finds #${item.key} = ` , search)
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
           return;
       }
       
       // does item exist already?
       let existing = await this.findOne(item);

       if (existing) {
          // update instead
          if (item.isDeleted()) {
            item.value._deleted = false;
          }
          return await this.update(item)
       }

       let result = await this._node.get(item.key).push(item.value);
       console.log(`${this.label} saves #${item.key}:`, item)
       return result;
    }

    /**
    * Updates values in database
    */
    async update(item) {
       console.debug(`${this.label}.update #${item.key}:`, item)
       let result = await this._node.get(item.key).push(item.value);
       return result;
    }

    /**
    * Removes object from database
    * Unregistration happens only based on listener
    */
    async remove(item) {
       if (!item || !item.key) {
           console.log(`${this.label}: skip remove ` , item)
       }
       if (item.value._deleted) {
           console.log(`${this.label}: already removed ` , item)
           return;
       }

       console.debug(`${this.label}.remove #${item.key}`)
       item.value._deleted = true;
       await this._node.get(item.key).push(item.value);
    }

    /**
    * Checks if item properties are valid and as expected
    */
    isValid(obj) {

      if (!obj || obj === null || typeof(obj) !== 'object') {
        return;
      }

      let data = null;
      if (obj.hasOwnProperty('_')) {
        // it is an Item
        data = this.nodeToJSON(obj);
      }
      else {
        data = obj.value;
      }
      if (!data || !typeof(data) == 'object' || !data.hasOwnProperty('id') || !data.hasOwnProperty('type')) {   
        return false;
      }
      return true;
    }

    /**
    * Converts JSON into Item and links to this collection
    */
    register(v,k) {
        // only allow if we have a type
        try {
            if (!this.isValid(v)) {
              throw new Error(`Invalid item value ${JSON.stringify(v)}`)
            }
            let key = [v.type, v.id].join('-');
            if (key != k) {
              throw new Error(`${this.label} #${k} missing expected key: ${key}`)
            }
        }
        catch(e) {
            // console.warn(e.message)
            return;
        }

        console.debug(`${this.label}.register #${k}`)
        const item = new Item(v);
        this._items.push(item);
        this._map.set(k,item);
    }

    get(k) {
      return this._map.get(k);
    }

    /**
    * Unlinks Item from this collection
    */
    unregister(k) {
        // skip non-existing items
        if (!this._map.has(k)) {
            console.log(`${this.label}: skip unregister: missing: ${k}`)
            return;
        }
        console.log(`${this.label}: unregister: ${k}`)

        let item = this._items.get(k);
        this._items.remove(item);
        this._map.delete(k);
    }

    get id() {
        return this._id;
    }

    get all() {
        return this._items;
    }
}

Collection.DB = null;

export default Collection;