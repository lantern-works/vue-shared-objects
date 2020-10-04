import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});

import Item from '../lib/item.js';
window.Item = Item;


class Fancy extends Item {

  constructor(v) {
    super(v);
  }

  set title(v) {
    this.set('title',v);
  }
}

Fancy.TYPE = 'fancy';

Item.register(Fancy);

window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    },
    methods: {
      saveNewItem() {
        let fancyItem = new Fancy({id: 'random-new-' + Math.random()});
        this.collection.save(fancyItem);
      },
      update(so) {
        console.log('update',so);
        so.set('title', Math.random());
        console.log(so)
        this.collection.save(so);
      },
      save(so) {
        this.collection.save(so);
      },
      remove(so) {
        this.collection.remove(so);
      },
      print(so) {
        so.log();
      }
    },
    async created() {

        // basic item
        let basicItem = new Item({id: "test", "hello": "world"});
        //this.collection.save(basicItem);

        // fancy item
        let id = "new-fancy";
        let fancyItem = new Fancy({id: id});
        //await this.collection.save(fancyItem);

        window.test = {
          "basic": basicItem,
          "fancy": fancyItem
        }
    }
});