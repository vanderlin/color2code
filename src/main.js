import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueHighlightJS from 'vue-highlightjs'
import VueClipboard from 'vue-clipboard2'
import Toasted from 'vue-toasted';


// you can also pass options, check options reference below
Vue.config.productionTip = false;

Vue.use(VueClipboard);
Vue.use(VueHighlightJS);
Vue.use(Toasted, {
	position: 'bottom-right'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
