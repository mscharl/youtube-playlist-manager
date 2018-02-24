import VueRouter from 'vue-router';

import HomeScreen from '../components/HomeScreen.vue'
import Playlist from '../components/Playlist.vue'

export default new VueRouter({
    mode                : 'hash',
    routes              : [
        {
            path     : '/',
            name     : 'home',
            component: HomeScreen,
        }, {
            path     : '/:playlistId',
            name     : 'playlist',
            component: Playlist,
        },
    ],
    linkActiveClass     : '--active',
    linkExactActiveClass: '--exact-active',
});
