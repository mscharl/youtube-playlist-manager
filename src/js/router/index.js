import Vue from 'vue';
import VueRouter from 'vue-router';

import { sync } from 'vuex-router-sync';
import store from '../store';
import router from './router';

Vue.use(VueRouter);

sync(store, router);

export default router;
