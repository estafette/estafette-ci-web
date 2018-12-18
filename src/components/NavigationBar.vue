<template>
    <b-navbar toggleable="sm" type="dark" variant="dark">

        <b-navbar-brand :to="{ name: 'Pipelines'}">Estafette CI</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'Pipelines'}">Pipelines</b-nav-item>
                <b-nav-item :to="{ name: 'Manifest'}">Manifest</b-nav-item>
                <b-nav-item :to="{ name: 'Statistics'}">Statistics</b-nav-item>
                <b-nav-item v-if="user && user.authenticated" :to="{ name: 'Config'}">Configuration</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto" v-if="user && user.authenticated">
                <b-nav-text right><em>{{user.email}}</em></b-nav-text>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</template>

<script>
export default {
  components: {
    'b-navbar': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/navbar/navbar'),
    'b-navbar-brand': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/navbar/navbar-brand'),
    'b-navbar-toggle': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/navbar/navbar-toggle'),
    'b-navbar-nav': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/navbar/navbar-nav'),
    'b-nav-item': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/nav/nav-item'),
    'b-nav-text': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/nav/nav-text'),
    'b-collapse': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/collapse/collapse')
  },
  props: {
    user: Object
  }
}
</script>
