export default function mixins(Vue, Vendor, options) {


    /**
     * Database Mixin
     */
    Vue.mixin({
        created: function() {
            this.$database = new Gun(options);
        }
    });
}