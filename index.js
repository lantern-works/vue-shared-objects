import log from './src/log.js';
import filters from './src/filters.js';
import mixins from './src/mixins.js';
const VueSharedObjects = {};
VueSharedObjects.install = function(Vue, options) {
    log(Vue, VueSharedObjectsVendor, options);
    filters(Vue, VueSharedObjectsVendor, options);
    mixins(Vue, VueSharedObjectsVendor, options);
};
export default VueSharedObjects;