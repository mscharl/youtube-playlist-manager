import * as types from './types/mutations';

export default {

    /**
     * Set the initialized flag
     * @param state
     * @param isInitialized
     */
    [types.SET_INITIALIZED](state, isInitialized) {
        state.initialized = isInitialized;
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

    /**
     * Flag to indicate whether a user is signed in
     * @param state
     * @param isSignedIn
     */
    [types.SET_SIGNED_IN](state, isSignedIn) {
        state.isSignedIn = isSignedIn;
    },
}
