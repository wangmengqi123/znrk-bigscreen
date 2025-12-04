import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import i18n from "./lang";

import "@/icons"; // icon
import "@/permission"; // permission control

import dataV from "@jiaminghi/data-view";
Vue.use(dataV);

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang
import locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

// Set Element UI language based on i18n locale
const setElementUILocale = () => {
  const currentLang = i18n.locale
  if (currentLang === 'zh') {
    locale.use(zhLocale)
  } else {
    locale.use(enLocale)
  }
}

// Initialize Element UI locale
setElementUILocale()

Vue.use(ElementUI);

// Watch for language changes and update Element UI locale
i18n._vm.$watch('locale', () => {
  setElementUILocale()
})

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
