<template>
    <atomic-fixed-position class="PlaylistHeader__wrapper">
        <header class="PlaylistHeader">
            <h1 class="PlaylistHeader__title">{{ title }}</h1>
        </header>
    </atomic-fixed-position>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import AtomicFixedPosition from '../atoms/AtomicFixedPosition';
    import * as storeModules from '../store/types/modules';
    import * as videosGetters from '../store/videos/types/getters';

    const { mapGetters } = createNamespacedHelpers(storeModules.VIDEOS);

    export default {
        name: 'PlaylistHeader',

        computed: {
            ...mapGetters({
                title: videosGetters.PLAYLIST_TITLE,
            }),
        },

        components: {
            AtomicFixedPosition,
        },
    }
</script>
