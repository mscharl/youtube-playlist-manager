import * as types from './types/mutations';

export default {
    /**
     * Store the given authentication instance
     *
     * @param state
     * @param authInstance
     */
    [types.SET_AUTH_INSTANCE](state, authInstance) {
        state.authInstance = authInstance
    }
}
