console.log("loading library..")
import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});
console.log('creating app...')
window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    }
});