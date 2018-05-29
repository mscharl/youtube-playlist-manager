<template>
    <article class="VideoItem" :class="classes" @click="handleSelectEvent">
        <div class="VideoItem__checkbox">
            <atomic-checkbox v-model="isSelected" />
        </div>
        <atomic-lazy-background-image class="VideoItem__image" :url="thumbnail"></atomic-lazy-background-image>
        <h3 class="VideoItem__title">{{ title }}</h3>
        <p class="VideoItem__description">{{ description }}</p>
    </article>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as videosActions from '../store/videos/types/actions';
    import * as videosGetters from '../store/videos/types/getters';
    import AtomicLazyBackgroundImage from '../atoms/AtomicLazyBackgroundImage';
    import AtomicCheckbox from '../atoms/AtomicCheckbox';

    export default {
        components: {
            AtomicCheckbox,
            AtomicLazyBackgroundImage,
        },
        name: 'VideoItem',

        props: {
            video: {
                type: Object,
                required: true,
            },
        },

        computed: {
            ...mapGetters(storeModules.VIDEOS, {
                isSelectedGetter: videosGetters.IS_SELECTED_GETTER,
            }),

            title() {
                return this.video.snippet.title
            },
            description() {
                const description = `${this.video.snippet.description}`;
                const trim = description.substr(0, 200);
                return trim.length < description.length ? `${trim}…` : trim;
            },
            thumbnail() {
                try {
                    return this.video.snippet.thumbnails.high.url;
                } catch (e) {
                    console.info('Thumbnail not available %o %o', this.video.snippet.resourceId.videoId, this.video);
                }
            },

            isSelected: {
                get() {
                    return this.isSelectedGetter(this.video.id);
                },
                set() {
                    this.handleSelectEvent();
                },
            },

            classes() {
                return {
                    '--selected': this.isSelected,
                }
            },
        },

        methods: {
            ...mapActions(storeModules.VIDEOS, {
                toggleSelection: videosActions.TOGGLE_SELECTION,
            }),
            handleSelectEvent() {
                this.toggleSelection(this.video);
            },
        },
    }
</script>
