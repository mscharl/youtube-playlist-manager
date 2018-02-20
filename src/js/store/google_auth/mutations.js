import * as types from './types/mutations';

export default {
    /**
     * Sets the init flag to true
     * @param state
     */
    [types.IS_INITIALIZING](state) {
        state.initializing = true
    },

    /**
     * Sets the init flag to false
     * @param state
     */
    [types.FINISHED_INITIALIZING](state) {
        state.initializing = false
    }
}
