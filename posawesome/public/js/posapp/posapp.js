import Home from "./Home.vue";

frappe.provide("frappe.PosApp");
// Vue.config.devtools = true;
frappe.PosApp.posapp = class {
  constructor({ parent }) {
    this.$parent = $(document);
    this.page = parent.page;
    this.make_body();
  }
  make_body() {
    this.$el = this.$parent.find(".main-section");
    this.vue = new Vue({
      vuetify: new Vuetify(),
      el: this.$el[0],
      data: {},
      render: (h) => h(Home),
    });
  }
  setup_header() {}
};
