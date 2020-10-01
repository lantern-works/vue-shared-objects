export default function filters(Vue, Vendor, options) {
    
    /**
     * Pluralize Filter
     */
    Vue.filter("pluralize", function(value, number) {
        return Vendor.pluralize(value, number);
    });

    /**
     * Uppercase Filter
     */
    Vue.filter("uppercase", function(value) {
        return typeof value == "string" ? value.toUpperCase() : value;
    });

    /**
     * Lowercase Filter
     */
    Vue.filter("lowercase", function(value) {
        return typeof value == "string" ? value.toLowerCase() : value;
    });

    /**
     * Titlecase Filter
     */
    Vue.filter("titlecase", function(value) {
        if (typeof value !== "string") return;
        let str = value.toLowerCase().split(" ");
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(" ");
    });
}