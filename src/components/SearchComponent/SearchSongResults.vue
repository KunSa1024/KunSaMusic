<template>
    <div class="SearchSongResults">
        <ul>
            <SongList v-for="vs in searchMusicList" :key="vs.id" :item="vs"></SongList>
        </ul>
    </div>
</template>

<script>
import SongList from './SongList';

export default {
    name: 'SearchSongResults',
    props: ['searchMusicList'],
    components: {
        SongList,   // 歌曲列表
    }
}
</script>

<style lang="less" scoped>
.SearchSongResults {

    ul {
        background-color: rgba(247, 247, 247, 0.1);
        color: #fff;
    }
}
</style>