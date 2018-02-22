<template>
    <router-link tag="article" :to="{name: 'playlist', params: {playlistId: playlist.id}}" class="PlaylistsItem">
        <div class="PlaylistsItem__image" :style="{backgroundImage: `url(${playlist.snippet.thumbnails.default.url})`}"></div>
        <div class="PlaylistsItem__content">
            <h3 class="PlaylistsItem__title">
                {{ playlist.snippet.title }}
            </h3>
            <p class="PlaylistsItem__description">
                {{ playlist.snippet.description }}
            </p>
        </div>
        <span class="badge badge-primary ml-auto">{{ playlist.contentDetails.itemCount }}</span>
    </router-link>
</template>

<script>
    export default {
        name: 'PlaylistsItem',

        props: {
            playlist: {
                required: true,
            },
        },
    }
</script>
