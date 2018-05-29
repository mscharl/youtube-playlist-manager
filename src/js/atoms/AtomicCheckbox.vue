<template>
    <label class="AtomicCheckbox" :class="classes" @click.stop>
        <input type="checkbox" class="custom-control-input" :disabled="disabled" v-model="model" >
        <span class="AtomicCheckbox__mark"></span>
    </label>
</template>

<script>
    export default {
        name: 'AtomicCheckbox',

        props: {
            value: {
                type: Boolean,
                default: null,
            },

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            model: {
                get() {
                    return this.value;
                },

                set(newValue) {
                    this.$emit('input', newValue);
                },
            },

            classes() {
                return [
                    {
                        '--disabled': this.disabled,
                    },
                ]
            },

            id() {
                return `atomic-checkbox--${this.uid}`;
            },
        },

        methods: {
            valueChanged(event) {
                this.model = !this.model;
            },
        },
    }
</script>
