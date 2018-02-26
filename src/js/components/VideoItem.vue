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
                return {
                    backgroundImage: `url('${this.video.snippet.thumbnails.high.url}')`,
                }
            },
        },
    }
</script>
