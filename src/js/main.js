import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'

new Vue({
    store,

    el    : '#app',
    render: h => h(App),
});
