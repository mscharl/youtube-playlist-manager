import * as types from './types/getters';

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
}
