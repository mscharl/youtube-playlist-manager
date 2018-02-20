<template>
    <div id="app">
        <login v-if="!isSignedIn"></login>
        <span v-if="isSignedIn">Hallo</span>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Login from './Login';
    import * as storeModules from '../store/types/modules';
    import * as googleAuthActions from '../store/google_auth/types/actions';
    import * as googleAuthGetters from '../store/google_auth/types/getters';

    export default {
        name      : 'YoutubePlaylistManager',

        components: {
            Login,
        },

        computed: {
            ...mapGetters(storeModules.GOOGLE_AUTH, {
                isSignedIn: googleAuthGetters.IS_SIGNED_IN
            })
        },

        mounted() {
            this.initGoogleAuth();
        },

        methods: {
            ...mapActions(storeModules.GOOGLE_AUTH, {
                initGoogleAuth: googleAuthActions.INIT
            })
        }
    }
</script>
