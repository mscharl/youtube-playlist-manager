import * as types from './types/getters';

export default {
    /**
     * Flag to indicate if the google api is initialized
     *
     * @param state
     * @return {boolean}
     */
    [types.IS_INITIALIZED](state) {
        return !!state.authInstance
    },

    /**
     * Flag to indicate if a user is currently signed in
     *
     * @param state
     * @param getters
     * @return {boolean}
     */
    [types.IS_SIGNED_IN](state, getters) {
        return getters[types.IS_INITIALIZED] && state.authInstance.isSignedIn.get();
    },

    /**
     * The current user object
     * @param state
     * @return {object}
     */
    [types.CURRENT_USER](state, getters) {
        if(!getters[types.IS_SIGNED_IN]) {
            return null
        }

        return state.authInstance.currentUser.get();
    }
}
