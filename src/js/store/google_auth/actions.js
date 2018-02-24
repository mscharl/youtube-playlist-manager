import * as types from './types/actions';
import * as mutationTypes from './types/mutations';

import * as GOOGLE_AUTH from '../../constants/GOOGLE_AUTH';

// Reference to the google API
const GoogleAPI = () => window.gapi;


export default {

    /**
     * Initialize the GoogleAPI client and authentication
     * @param {ActionContext} context
     */
    [types.INIT](context) {
        // Load the API's client and auth2 modules.
        // Calls the init function after the modules load.
        return GoogleAPI().load('client:auth2', () => {

            // Initialize the gapi.client object, which app uses to make API requests.
            // Get API key and client ID from API Console.
            // 'scope' field specifies space-delimited list of access scopes.
            GoogleAPI().client.init({
                apiKey       : GOOGLE_AUTH.API_KEY,
                clientId     : GOOGLE_AUTH.CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
                scope        : 'https://www.googleapis.com/auth/youtube.force-ssl',
            }).then(() => {
                const googleAuth = GoogleAPI().auth2.getAuthInstance();

                context.commit(mutationTypes.SET_INITIALIZED, true);
                context.commit(mutationTypes.SET_SIGNED_IN, googleAuth.isSignedIn.get());

                googleAuth.isSignedIn.listen((isSignedIn) => {
                    context.commit(mutationTypes.SET_SIGNED_IN, isSignedIn);
                });
            });
        });
    },

    /**
     * Run the google sign in process
     * @param context
     * @return {Promise<void>}
     */
    [types.SIGN_IN](context) {
        context.commit(mutationTypes.START_SIGN_IN);

        const authInstance = GoogleAPI().auth2.getAuthInstance();

        return authInstance.signIn().then((user) => {
            context.commit(mutationTypes.END_SIGN_IN);
        }, (error) => {
            context.commit(mutationTypes.END_SIGN_IN);
            console.error(error);
            // Silent Fail
        });
    },
}
