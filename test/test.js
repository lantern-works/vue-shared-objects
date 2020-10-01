import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});

import Item from '../lib/item.js';
window.Item = Item;


class Fancy extends Item {
  static TYPE = 'fancy';
  constructor(v) {
    super(v);
  }
}

window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    },
    methods: {
      print(so) {
        so.log();
      }
    },
    created() {
        // let basicItem = new Item({id: "test", "hello": "world"});
        // this.collection.save(basicItem);
        Item.register(Fancy);
        let id = "new-fancy";
        window.fancyItem = new Fancy({id: id});
        this.collection.save(window.fancyItem);
    }
});