<template>
    <section class="Playlists">
        <playlists-item :playlist="playlist" v-for="playlist in playlists" :key="playlist.id"></playlists-item>
        <footer class="Playlists__footer">
            <atomic-button class="btn-outline-primary"
                           v-if="canLoadMore"
                           :disabled="fetchingItems"
                           :activity="fetchingItems"
                           @click="loadNextPage"
            >
                Load more entries
            </atomic-button>
        </footer>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as playlistsActions from '../store/playlists/types/actions';
    import * as playlistsGetters from '../store/playlists/types/getters';
    import PlaylistsItem from './PlaylistsItem';
    import AtomicButton from '../atoms/AtomicButton';

    const { mapGetters, mapActions } = createNamespacedHelpers(storeModules.PLAYLISTS);

    export default {
        name: 'Playlists',

        components: {
            AtomicButton,
            PlaylistsItem,
        },

        computed: {
            ...mapGetters({
                playlists    : playlistsGetters.ITEMS,
                canLoadMore  : playlistsGetters.CAN_LOAD_MORE,
                fetchingItems: playlistsGetters.FETCHING_ITEMS,
            }),
        },

        mounted() {
            this.getFirstPage();
        },

        methods: {
            ...mapActions({
                getFirstPage: playlistsActions.GET_PAGE,
                loadNextPage: playlistsActions.GET_NEXT_PAGE,
            }),
        },
    }
</script>
