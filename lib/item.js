export default class Item {

    constructor(v) {
        if (!v) {
            console.debug(`@item skip construct: missing id or value`)
            return;
        }
        try {
            if (!v.id) {
                throw new Error(`Missing ID for item ${JSON.stringify(v)}`);
            }
            this.type = v.type = v.type || 'item';
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


    toJSON() {
        if (!this.value) return null;
        return Object.keys(this.value)
          .filter( key => key != '_' )
          .reduce( (res, key) => Object.assign(res, { [key]: this.value[key] }), {} );
    }
}