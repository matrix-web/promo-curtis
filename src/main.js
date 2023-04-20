import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import VueToast from "vue-toast-notification";
import VueQrcodeReader from "vue-qrcode-reader";
import VScrollLock from "v-scroll-lock";
import VueScrollTo from "vue-scrollto";

import "@/assets/styles/main.scss";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(VueQrcodeReader);
Vue.use(VueToast);
Vue.use(VScrollLock);
Vue.use(VueScrollTo);

const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

export { app };

const insert2body = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.style.display = "none";
  document.querySelector("body")?.prepend(div);
};

(async () => {
  if (typeof window !== "undefined" && "caches" in window) {
    const spriteLink = "/sprite.svg";
    const newCache = await caches.open("sprite");
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "image/svg+xml",
      }),
    };
    let response = await newCache.match(spriteLink);
    let html;

    if (!response) {
      const req = new Request(spriteLink, options);
      await newCache.add(req);
      response = await newCache.match(spriteLink);
      html = await response?.text();
      insert2body(html || "");
      return;
    }

    html = await response.text();
    insert2body(html);
  }
})();
