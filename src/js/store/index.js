import Vue from 'vue';
import vuex from 'vuex';

import * as moduleTypes from './types/modules';
import google_auth from './google_auth';
import playlists from './playlists';
import videos from './videos';

Vue.use(vuex);

export default new vuex.Store({
    // TODO: Strict mode causes `Maximum call stack size exceeded`
    // strict: process.env.NODE_ENV !== 'production',

    modules: {
        [moduleTypes.GOOGLE_AUTH]: google_auth,
        [moduleTypes.PLAYLISTS]  : playlists,
        [moduleTypes.VIDEOS]     : videos,
    },
});
