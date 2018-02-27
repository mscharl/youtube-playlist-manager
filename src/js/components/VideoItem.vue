<template>
    <article class="VideoItem">
        <atomic-lazy-background-image class="VideoItem__image" :url="thumbnail"></atomic-lazy-background-image>
        <h3 class="VideoItem__title">{{ title }}</h3>
        <p class="VideoItem__description">{{ description }}</p>
    </article>
</template>

<script>
    import AtomicLazyBackgroundImage from '../atoms/AtomicLazyBackgroundImage';

    export default {
        components: { AtomicLazyBackgroundImage },
        name      : 'VideoItem',

        props: {
            video: {
                type    : Object,
                required: true,
            },
        },

        computed: {
            title() {
                return this.video.snippet.title
            },
            description() {
                const description = `${this.video.snippet.description}`;
                const trim        = description.substr(0, 200);
                return trim.length < description.length ? `${trim}…` : trim;
            },
            thumbnail() {
                try {
                    return this.video.snippet.thumbnails.high.url;
                } catch(e) {
                    console.info('Thumbnail not available %o %o', this.video.snippet.resourceId.videoId, this.video);
                }
            },
        },
    }
</script>
