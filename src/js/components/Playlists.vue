<template>
    <section class="Playlists">
        <div v-for="playlist in playlists">
            {{ playlist.snippet.title }}
        </div>
        <button class="btn btn-outline-primary" v-if="canLoadMore" @click="loadNextPage" :disabled="fetchingItems">
            Load more entries
        </button>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as playlistsActions from '../store/playlists/types/actions';
    import * as playlistsGetters from '../store/playlists/types/getters';

    const { mapGetters, mapActions } = createNamespacedHelpers(storeModules.PLAYLISTS);

    export default {
        name: 'Playlists',

        components: {},

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
