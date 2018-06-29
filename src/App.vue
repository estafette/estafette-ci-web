<template>
  <div id="app">
    <div id="header-and-main">
      <navigation-bar/>
      <div id="main">
        <router-view/>
      </div>
    </div>
    <site-footer/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
