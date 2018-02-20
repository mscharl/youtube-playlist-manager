<script>
    import * as storeModules from '../store/types/modules';
    import * as googleAuthGetters from '../store/google_auth/types/getters';
    import Login from './Login';

    const isSignedIn = (store) => {
        const key = `${storeModules.GOOGLE_AUTH}/${googleAuthGetters.IS_SIGNED_IN}`;
        return store.getters[key];
    };

    export default {
        name: 'AuthenticationWall',

        functional: true,

        render(createElement, context) {
            if(context.children.length !== 1) {
                throw new Error('AuthenticationWall requires exactly one child element');
            }

            return isSignedIn(context.parent.$store) ? context.children[0] : createElement(Login);
        },
    }
</script>
