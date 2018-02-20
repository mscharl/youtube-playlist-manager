import Vue from 'vue'
import App from './App.vue'
import store from './js/store'

new Vue({
    store,

    el    : '#app',
    render: h => h(App),
});
