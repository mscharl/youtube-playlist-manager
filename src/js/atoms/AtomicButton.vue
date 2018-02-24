<template>
    <button class="btn"
            :disabled="isDisabled"
            @click="eventPassThrough"
    >
        <span v-if="activity">…</span>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'AtomicButton',

        props: {
            disabled: {
                type   : Boolean,
                default: false,
            },

            activity: {
                type   : Boolean,
                default: false,
            },
        },

        computed: {
            isDisabled() {
                return this.disabled || this.activity;
            },
        },

        methods: {
            eventPassThrough(event) {
                this.$emit(event.type, event);
            },
        },
    }
</script>
