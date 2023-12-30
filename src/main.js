import { createApp } from "vue";
import App from "./App.vue";

import { createStore } from "vuex";

import BalmUI from "balm-ui"; // Official Google Material Components
import BalmUIPlus from "balm-ui/dist/balm-ui-plus.js"; // BalmJS Team Material Components
import "balm-ui/dist/balm-ui.css";

import {
  themeModule,
  squareModule,
  boardModule,
  snackBarModule
} from "./store/modules/index.js";

const store = createStore({
  modules: { themeModule, squareModule, boardModule, snackBarModule },
});

const app = createApp(App);

app.use(store);
app.use(BalmUI);
app.use(BalmUIPlus);

app.mount("#app");
