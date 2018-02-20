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
                apiKey: GOOGLE_AUTH.API_KEY,
                clientId: GOOGLE_AUTH.CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
                scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
            }).then(function () {
                context.commit(mutationTypes.SET_AUTH_INSTANCE, GoogleAPI().auth2.getAuthInstance());

                // Handle initial sign-in state. (Determine if user is already signed in.)
                // var user = GoogleAuth.currentUser.get();
                // setSigninStatus();
            });
        });
    }
}
