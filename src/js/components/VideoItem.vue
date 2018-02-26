<template>
    <article class="VideoItem">
        <div class="VideoItem__image" :style="imageStyle"></div>
        <h3 class="VideoItem__title">{{ title }}</h3>
        <p class="VideoItem__description">{{ description }}</p>
    </article>
</template>

<script>
    export default {
        name: 'VideoItem',

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
            imageStyle() {
                try {
                    const url = this.video.snippet.thumbnails.high.url;

                    return {
                        backgroundImage: `url('${url}')`,
                    }
                } catch(e) {
                    console.info('Thumbnail not available %o %o', this.video.snippet.resourceId.videoId, this.video);
                }
            },
        },
    }
</script>
