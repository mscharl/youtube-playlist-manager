<template>
    <div :style="imageStyle"></div>
</template>

<script>
    export default {
        name: 'AtomicLazyBackgroundImage',

        props: {
            url: {
                type   : String,
                require: false,
            },
        },

        inject: ['intersectionObserver'],

        data() {
            return {
                isVisible                  : false,
                intersectionDebounceTimeout: null,
            }
        },

        computed: {
            imageStyle() {
                return {
                    backgroundImage: (this.url && this.isVisible) ? `url('${this.url}')` : null,
                }
            },
        },

        mounted() {
            this.intersectionObserver.observe(this.$el, (...args) => this.handleIntersectionEvent(...args));
        },

        beforeDestroy() {
            this.intersectionObserver.unobserve(this.$el);
        },

        methods: {
            handleIntersectionEvent(observerEntry) {
                clearTimeout(this.intersectionDebounceTimeout);

                if(observerEntry.isIntersecting) {
                    this.intersectionDebounceTimeout = setTimeout(() => {
                        this.isVisible = true;
                    }, 50);
                }
            },
        },
    }
</script>
