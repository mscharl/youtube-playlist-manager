<template>
    <atomic-fixed-position class="PlaylistHeader__wrapper">
        <header class="PlaylistHeader">
            Header
        </header>
    </atomic-fixed-position>
</template>

<script>
    import AtomicFixedPosition from '../atoms/AtomicFixedPosition';

    export default {
        name: 'PlaylistHeader',

        components: {
            AtomicFixedPosition,
        },
    }
</script>
