<template>
  <div id="app">
    <router-view/>
    <div class="main_content clearfix">
      <router-view name='content'/>
      <router-view name='aside'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang='stylus'>
  .main_content
    width 936px
    margin 0 auto
</style>
