import Database from './lib/database.js';
import filters from './lib/filters.js';
const VueSharedObjects = {};
VueSharedObjects.install = function(Vue, options) {
    filters(Vue, VSOView, options);

    /**
     * Database Mixin
     */
    Vue.mixin({
        created: function() {
            this.$database = Database(Vue, options);
        },
    });
};
export default VueSharedObjects;