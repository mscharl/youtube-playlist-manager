<template>
    <div class="AtomicFixedPosition" :style="wrapperStyle">
        <div class="AtomicFixedPosition__content" :class="contentClass" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AtomicFixedPosition',

        data() {
            return {
                contentHeight: 0,
            };
        },

        computed: {
            /**
             * Calculate the style object for the wrapper element.
             *
             * @return {object}
             */
            wrapperStyle() {
                return {
                    height: `${this.contentHeight}px`,
                };
            },

            /**
             * Calculate the classes for the content element.
             *
             * @return {object}
             */
            contentClass() {
                return {
                    '--fixed': this.contentHeight > 0,
                };
            },
        },

        /**
         * On mount calculate the fixed elements height.
         */
        mounted() {
            const { height } = this.$refs.content.getBoundingClientRect();
            this.contentHeight = height;
        },
    }
</script>
