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
            this._value = v;
            this._id = v.id;
            this._type = v.type = 'item' || v.type; // default generic item
        }
        catch(e) {
            console.warn(e)
            return;
        }
    }

    get type() {
        return this._type;
    }

    get id() {
        return this._id;
    }

    get key() {
        if (this._type && this._id) {
            return [this._type,this._id].join('-');
        }
        return null;
    }

    get value() {
        return this._value;
    }

    toJSON() {
        if (!this._value) return null;
        return Object.keys(this._value)
          .filter( key => key != '_' )
          .reduce( (res, key) => Object.assign(res, { [key]: this._value[key] }), {} );
    }
}