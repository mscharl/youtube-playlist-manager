<template>
    <section class="Playlist">
        <section class="Playlist__items">
            <video-item v-for="video in videos" :video="video" :key="video.id"></video-item>
        </section>

        <footer class="Playlist__footer" v-if="canLoadMore">
            <atomic-button class="btn-outline-primary btn-sm"
                           :disabled="fetchingItems"
                           :activity="fetchingItems && !fetchingAllItems"
                           @click="loadNextPage"
            >
                Load more entries
            </atomic-button>
            or
            <atomic-button class="btn-outline-dark btn-sm"
                           :disabled="fetchingItems"
                           :activity="fetchingAllItems"
                           @click="loadAllPages"
            >
                Load all entries
            </atomic-button>
        </footer>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as videosActions from '../store/videos/types/actions';
    import * as videosGetters from '../store/videos/types/getters';
    import AtomicButton from '../atoms/AtomicButton';
    import VideoItem from './VideoItem';

    const { mapGetters, mapActions } = createNamespacedHelpers(storeModules.VIDEOS);

    export default {
        name      : 'Playlist',
        components: {
            VideoItem,
            AtomicButton,
        },

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
