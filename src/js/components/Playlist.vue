<template>
    <div>
        Playlist
        <ul>
            <li v-for="video in videos">{{ video.id }}</li>
        </ul>
        <template v-if="canLoadMore">
            <button class="btn btn-outline-primary" @click="loadNextPage" :disabled="fetchingItems">
                Load more entries
            </button>
            or
            <button class="btn btn-outline-dark" @click="loadAllPages" :disabled="fetchingItems">
                Load all entries
            </button>
        </template>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as videosActions from '../store/videos/types/actions';
    import * as videosGetters from '../store/videos/types/getters';

    const { mapGetters, mapActions } = createNamespacedHelpers(storeModules.VIDEOS);

    export default {
        name: 'Playlist',

        computed: {
            ...mapGetters({
                videos          : videosGetters.ITEMS,
                fetchingItems   : videosGetters.FETCHING_ITEMS,
                fetchingAllItems: videosGetters.FETCHING_ALL_ITEMS,
                canLoadMore     : videosGetters.CAN_LOAD_MORE,
            }),
        },

        mounted() {
            // Initialize watcher for playlist id
            // TODO: decide if store plugin, watcher in main file or dispatch in playlist lifecycle method
            this.$store.watch((state) => state.route.params.playlistId, (value, oldValue) => {
                if(value && value !== oldValue) {
                    this.$store.dispatch(`${storeModules.VIDEOS}/${videosActions.RESET}`);
                }
            }, {
                immediate: true,
            });
        },

        methods: {
            ...mapActions({
                loadNextPage: videosActions.GET_NEXT_PAGE,
                loadAllPages: videosActions.GET_ALL_PAGES,
            }),
        },
    }
</script>
