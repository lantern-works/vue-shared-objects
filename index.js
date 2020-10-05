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

      // work within namespace
      const namespace = options.namespace || "_VSO_";
      const label = '@'+namespace;


    filters(Vue, VSOView, options);
    Vue.use(VSOView.asyncComputed);
    Collection.DB = new Database(Vue, options);
    Collection.ITEMS = Collection.DB.get(namespace);
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
            this.$items = Collection.ITEMS;
            await this.$data.collection.watch();
        }
    });
};
export default VueSharedObjects;