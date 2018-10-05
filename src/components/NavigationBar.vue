<template>
    <b-navbar toggleable="sm" type="dark" variant="dark">

        <b-navbar-brand :to="{ name: 'Pipelines'}">Estafette CI</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'Pipelines'}">Pipelines</b-nav-item>
                <!-- <b-nav-item :to="{ name: 'Targets'}"  disabled>Targets</b-nav-item> -->
                <b-nav-item :to="{ name: 'Statistics'}" >Statistics</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto" v-if="user">
                <b-nav-text right><em>{{user.email}}</em></b-nav-text>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      user: null,
      errors: []
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    loadUser () {
      axios.get(`/api/users/me`)
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshUser(60)
        })
    },

    periodicallyRefreshUser (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadUser, timeoutWithJitter)
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
