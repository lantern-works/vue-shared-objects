import Database from './database.js';

export default function mixins(Vue, Vendor, options) {

    /**
     * Database Mixin
     */
    Vue.mixin({
        created: function() {
            this.$database = Database(Vue, Vendor, options);
        },
    });
}
