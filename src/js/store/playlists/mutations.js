import * as types from './types/mutations';

export default {
    /**
     * Add the given items to the state array
     * @param state
     * @param items
     */
    [types.ADD_ITEMS](state, items) {
        // Ensure playlists are unique
        items = items.filter((newPlaylist) => {
            return state.items.every((playlist) => playlist.id !== newPlaylist.id)
        })

        state.items = [...state.items, ...items];
    },

    /**
     * Store the given next page token
     * @param state
     * @param token
     */
    [types.SET_NEXT_PAGE_TOKEN](state, token = null) {
        state.nextPageToken = token;
    },

    /**
     * Set the fetching flag
     * @param state
     */
    [types.SET_FETCHING_ITEMS](state) {
        state.fetchingItems = true;
    },

    /**
     * Reset the fetching flag
     * @param state
     */
    [types.RESET_FETCHING_ITEMS](state) {
        state.fetchingItems = false;
    },
}
