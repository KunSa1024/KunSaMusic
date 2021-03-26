<template>
    <div class="Pictures">
        <img :src="picUrl" alt="">
    </div>
</template>

<script>
export default {
    name: 'Pictures',
    props: ['picUrl']
}
</script>

<style lang="less" scoped>
.Pictures {
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 100%;
    background-color: #fff;
    margin: 1.875rem auto 0rem auto;
    overflow: hidden;
    img {
        width: 100%;
    }
}
</style>