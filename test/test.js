console.log("loading library..")
import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});

import Item from '../lib/item.js';
window.Item = Item;

console.log('creating app...')
window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    },
    created() {
        let item = new Item({id: "test", a: 12345})
        this.collection.save(item);
    }
});