<template>
    <div id="app">
        <authentication-wall>
            <main class="App">
                <aside class="App__sidebar">
                    <playlists></playlists>
                </aside>
                <section class="App__content">
                    <router-view></router-view>
                </section>
            </main>
        </authentication-wall>
    </div>
</template>

<script>
    import AuthenticationWall from './AuthenticationWall';
    import Playlists from './Playlists';

    export default {
        name: 'YoutubePlaylistManager',

        components: {
            AuthenticationWall,
            Playlists,
        }
    }
</script>
