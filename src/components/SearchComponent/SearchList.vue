<template>
    <div class="SearchList">
        <ul>
            <li class="search" v-if="keywords!=''">搜索: {{ keywords }}</li>
            <li class="searchLi" v-for="s in suggests" :key="s.id" @click="$emit('SearchSongResults', s.name)">
                <i></i>
                {{ s|filtType }} - {{ s.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SearchList',
    props: {
        suggests: {
            type: Array,
            default: function() {
                return [];
            }
        },
        keywords: String
    },
    filters: {
        filtType(v) {
            if (typeof v.artists != 'undefined') {
                return '歌曲: '
            } else if (typeof v.artists != 'undefined') {
                return '专辑: '
            } else {
                return '歌手: '
            }
        }
    }
}
</script>

<style lang="less" scoped>
.SearchList {
    
    ul {
        margin: 0px 10px;
        background-color: rgb(255 255 255 / 38%);
        li.search {
            text-align: center;
        }
        li.searchLi {
            text-align: left;
            text-indent: 2em;
        }
        li {
            border-bottom: 1px solid #000;
            padding-top: 10px;
            padding-bottom: 5px;
            position: relative;
            i {
                width: 20px;
                height: 20px;
                display: inline-block;
                background: url(../../assets/搜索.png) no-repeat;
                background-size: contain;
                position: absolute;
                left: 5px;
                top: 10px;
            }
        }
    }
}
</style>