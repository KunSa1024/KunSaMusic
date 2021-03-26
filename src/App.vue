<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view></router-view>

  </div>
</template>

<script>


export default {
  name:'App',
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #253042;

  width: 100%;
  overflow: hidden;
}

body {
  margin: 0 auto;
}

/* 图片大小 100% */
.auto-img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 多出截断用'...'表示 */
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>
