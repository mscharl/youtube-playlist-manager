<template>
    <div id="app">
        <authentication-wall>
            <span>Hallo</span>
        </authentication-wall>
    </div>
</template>

<script>
    import AuthenticationWall from './AuthenticationWall';

    export default {
        name: 'YoutubePlaylistManager',

        components: {
            AuthenticationWall,
        }
    }
</script>
