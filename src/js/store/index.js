import Vue from 'vue';
import vuex from 'vuex';

import * as moduleTypes from './types/modules';
import google_auth from './google_auth';
import playlists from './playlists';

Vue.use(vuex);

export default new vuex.Store({
    modules: {
        [moduleTypes.GOOGLE_AUTH]: google_auth,
        [moduleTypes.PLAYLISTS]  : playlists,
    },
});
