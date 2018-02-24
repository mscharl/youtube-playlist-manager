import * as types from './types/getters';

const GoogleAPI = () => window.gapi;

export default {
    /**
     * Flag to indicate if the google api is initialized
     *
     * @param state
     * @return {boolean}
     */
    [types.IS_INITIALIZED](state) {
        return state.initialized && !!GoogleAPI().auth2.getAuthInstance();
    },

    /**
     * Flag to indicate if a user is currently signed in
     *
     * @param state
     * @param getters
     * @return {boolean}
     */
    [types.IS_SIGNED_IN](state, getters) {
        return getters[types.IS_INITIALIZED] && state.isSignedIn;
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

        return GoogleAPI().auth2.getAuthInstance().currentUser.get();
    },

    /**
     * Flag that is true while a sign in process is running
     * @param state
     * @return {boolean}
     */
    [types.SIGNING_IN](state) {
        return state.signingIn;
    },
}
