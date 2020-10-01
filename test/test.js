console.log("loading library..")
import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});

import Item from '../lib/item.js';
window.Item = Item;


class Fancy extends Item {
  constructor(v) {
    v.type = 'fancy';
    super(v);
    console.log("creating my fancy item...", v)
  }
}

console.log('creating app...')
window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    },
    created() {
        // let basicItem = new Item({id: "test", "hello": "world"});
        // this.collection.save(basicItem);

        let id = "new-fancy";
        window.fancyItem = new Fancy({id: id});
        this.collection.save(window.fancyItem);
    }
});