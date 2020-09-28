import Database from './lib/database.js';
import filters from './lib/filters.js';


const VueSharedObjects = {};
VueSharedObjects.install = function(Vue, options) {
    filters(Vue, VSOView, options);
    Vue.use(VSOView.asyncComputed);
    /**
     * Database Mixin
     */
    Vue.mixin({
        created: async function() {
            this.$database = await Database(Vue, options);
        },
    });
};
export default VueSharedObjects;