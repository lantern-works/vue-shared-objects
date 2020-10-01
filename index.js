import Database from './lib/database.js';
import Collection from './lib/collection.js';
import filters from './lib/filters.js';

Array.prototype.remove = function () {
    var what; var a = arguments; var L = a.length; var ax
    while (L && this.length) {
        what = a[--L]
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1)
        }
    }
    return this
}

const VueSharedObjects = {};
VueSharedObjects.install = function(Vue, options) {
    filters(Vue, VSOView, options);
    Vue.use(VSOView.asyncComputed);
    Collection.DB = new Database(Vue, options);
    const collection = new Collection(options.collection);

    /**
     * Database Mixins
     */
    Vue.mixin({
        data() {
            return {
                collection: collection
            }
        },
        async created() {
            this.$database = Collection.DB;
            await this.collection.watch();
        }
    });
};
export default VueSharedObjects;