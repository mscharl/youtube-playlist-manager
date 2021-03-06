import * as types from './types/actions';
import * as mutationTypes from './types/mutations';
import * as getterTypes from './types/getters';

const GoogleAPI = () => window.gapi;

export default {

    /**
     * Remove all currently stored videos and fetch new data
     *
     * @param context
     */
    [types.RESET](context) {
        context.commit(mutationTypes.RESET_ITEMS);
        context.commit(mutationTypes.SET_NEXT_PAGE_TOKEN, null);

        return context.dispatch(types.GET_PAGE);
    },

    /**
     * Load all videos from the selected playlist
     * @param context
     * @param pageToken
     * @return {Promise<void>}
     */
    [types.GET_PAGE](context, pageToken = null) {
        const playlistId = context.rootState.route.params.playlistId;

        context.commit(mutationTypes.SET_FETCHING_ITEMS);

        return GoogleAPI().client.request({
            methods: 'GET',
            path   : 'https://www.googleapis.com/youtube/v3/playlistItems',
            params : {
                playlistId,
                part      : [
                    'snippet',
                ].join(','),
                maxResults: 50,
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

    /**
     * Load the next page based on the stored page token
     *
     * @param context
     * @return {Promise<void>}
     */
    [types.GET_NEXT_PAGE](context) {
        return context.dispatch(types.GET_PAGE, context.state.nextPageToken);
    },

    /**
     * Keeps calling the next page action until all pages are loaded
     *
     * @param context
     * @return {Promise<void>}
     */
    [types.GET_ALL_PAGES](context) {
        context.commit(mutationTypes.SET_FETCHING_ALL_ITEMS);

        function getNextPageRecursiveHelper() {
            return context.dispatch(types.GET_NEXT_PAGE)
                          .then(() => {
                              if(context.getters[getterTypes.CAN_LOAD_MORE]) {
                                  return getNextPageRecursiveHelper();
                              }
                          });
        }

        return getNextPageRecursiveHelper().then(() => {
            context.commit(mutationTypes.RESET_FETCHING_ALL_ITEMS);
        }, (error) => {
            context.commit(mutationTypes.RESET_FETCHING_ALL_ITEMS);
            return Promise.reject(error);
        })
    },

    /**
     * Select or deselect a video
     *
     * @param context
     * @param video
     */
    [types.TOGGLE_SELECTION](context, video) {
        const isSelected = context.state.selectedVideos.indexOf(video.id) !== -1;

        if (isSelected) {
            context.commit(mutationTypes.DESELECT_VIDEO, video.id);
        } else {
            context.commit(mutationTypes.SELECT_VIDEO, video.id);
        }
    },
}
