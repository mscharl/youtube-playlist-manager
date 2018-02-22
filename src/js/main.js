import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';

import { mapActions } from 'vuex';
import * as storeModules from './store/types/modules';
import * as googleAuthActions from './store/google_auth/types/actions';

new Vue({
    store,
    router,

    el    : '#app',
    render: h => h(App),

    mounted() {
        this.initGoogleAuth();

        // Initialize watcher for playlist id
        store.watch((state) => state.route.params.playlistId, (value, oldValue) => {
            console.log(value, oldValue);
        });
    },

    methods: {
        ...mapActions(storeModules.GOOGLE_AUTH, {
            initGoogleAuth: googleAuthActions.INIT,
        }),
    },
});
