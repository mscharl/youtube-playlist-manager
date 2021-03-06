import * as moduleTypes from '../types/modules';
import * as types from './types/getters';
import * as playlistsGetters from './types/getters';

export default {
    /**
     * Get all loaded items
     * @param state
     * @return {*[]}
     */
    [types.ITEMS](state) {
        return [...state.items]
    },

    /**
     * Flag to check if more items can be loaded
     * @param state
     * @return {boolean}
     */
    [types.CAN_LOAD_MORE](state) {
        return state.nextPageToken !== null;
    },

    [types.FETCHING_ITEMS](state) {
        return state.fetchingItems;
    },

    [types.FETCHING_ALL_ITEMS](state) {
        return state.fetchingAllItems;
    },

    [types.IS_SELECTED_GETTER](state) {
        return (videoId) => (state.selectedVideos.indexOf(videoId) !== -1)
    },

    [types.PLAYLIST_TITLE](state, getters, rootState, rootGetters) {
        const { playlistId } = rootState.route.params;
        const items = rootGetters[`${moduleTypes.PLAYLISTS}/${playlistsGetters.ITEMS}`];

        const playlist = items.filter((playlist) => playlist.id === playlistId)[0];

        if (!playlist) {
            return;
        }

        return playlist.snippet.title;
    },
}
