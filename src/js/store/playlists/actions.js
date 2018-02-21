import * as types from './types/actions';
import * as mutationTypes from './types/mutations';

const GoogleAPI = () => window.gapi;

export default {

    /**
     * Load all playlists from the signed in user
     * @param context
     * @return {Promise<void>}
     */
    [types.GET_PAGE](context, pageToken = null) {
        context.commit(mutationTypes.SET_FETCHING_ITEMS);

        return GoogleAPI().client.request({
            methods: 'GET',
            path   : 'https://www.googleapis.com/youtube/v3/playlists',
            params : {
                part      : [
                    'id', 'status', 'snippet', 'contentDetails',
                ].join(','),
                mine      : true,
                maxResults: 5,
                pageToken,
            },
        }).then((response) => {
            const { items, nextPageToken } = response.result;

            context.commit(mutationTypes.SET_NEXT_PAGE_TOKEN, nextPageToken);
            context.commit(mutationTypes.ADD_ITEMS, items);

            context.commit(mutationTypes.RESET_FETCHING_ITEMS);
        }, (error) => {
            context.commit(mutationTypes.RESET_FETCHING_ITEMS);
            return Promise.reject(error);
        });
    },

    [types.GET_NEXT_PAGE](context) {
        return context.dispatch(types.GET_PAGE, context.state.nextPageToken);
    },
}
