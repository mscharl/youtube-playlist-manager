import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'

import { mapActions } from 'vuex';
import * as storeModules from './store/types/modules';
import * as googleAuthActions from './store/google_auth/types/actions';

new Vue({
    store,

    el    : '#app',
    render: h => h(App),

    mounted() {
        this.initGoogleAuth();
    },

    methods: {
        ...mapActions(storeModules.GOOGLE_AUTH, {
            initGoogleAuth: googleAuthActions.INIT,
        }),
    },
});
