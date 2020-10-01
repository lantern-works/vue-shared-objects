import Database from './lib/database.js';
import Collection from './lib/collection.js';
import filters from './lib/filters.js';


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