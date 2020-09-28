import VueSharedObjects from "../index.js"
Vue.use(VueSharedObjects, {
     peers: ["http://localhost:8080/gun"]
});
window.app = new Vue({
    el: "#app",
    data: {
      worldName: "world",
      worldCount: 1
    }
});