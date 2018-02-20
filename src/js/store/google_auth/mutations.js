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
    },

    /**
     * Set the sign in flag
     * @param state
     */
    [types.START_SIGN_IN](state) {
        state.signingIn = true;
    },

    /**
     * Reset the sign in flag
     * @param state
     */
    [types.END_SIGN_IN](state) {
        state.signingIn = false;
    },
}
