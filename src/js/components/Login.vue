<template>
    <section class="Login">
        <header class="Login__header">
            <h1 class="Login__title">Welcome to Youtube Playlist Manager</h1>
            <p class="Login__description" v-if="!isSignedIn && isInitialized">To use this tool please connect with your Google/Youtube Account</p>
        </header>
        <atomic-button class="btn btn-outline-light btn-lg"
                       :disabled="loading"
                       :activity="loading"
                       @click="signIn"
        >

            <span v-if="!isInitialized">Initializing</span>
            <span v-if="signingIn">Loading</span>
            <span v-if="!loading">Sign in with Google</span>
        </atomic-button>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import * as storeModules from '../store/types/modules';
    import * as googleAuthActions from '../store/google_auth/types/actions';
    import * as googleAuthGetters from '../store/google_auth/types/getters';
    import AtomicButton from '../atoms/AtomicButton';

    const { mapActions, mapGetters } = createNamespacedHelpers(storeModules.GOOGLE_AUTH);

    export default {
        components: { AtomicButton },
        name      : 'Login',

        computed: {
            ...mapGetters({
                isInitialized: googleAuthGetters.IS_INITIALIZED,
                signingIn    : googleAuthGetters.SIGNING_IN,
                isSignedIn   : googleAuthGetters.IS_SIGNED_IN,
            }),

            loading() {
                return !this.isInitialized || this.signingIn;
            },
        },

        methods: {
            ...mapActions({
                signIn: googleAuthActions.SIGN_IN,
            }),
        },
    }
</script>
