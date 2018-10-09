<template>
  <span v-if="release">
    <button class="btn btn-outline-dark btn mr-1 mb-1" v-on:click.stop="startRelease" :disabled="!user || !user.authenticated">
      {{release.name}} <span class="oi oi-play-circle pull-right ml-1"></span>
    </button>
  </span>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    release: Object,
    build: Object,
    user: Object
  },
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    startRelease: function (event) {
      if (this.user.authenticated) {
        this.clicked = true
        axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/releases`, {
          name: this.release.name,
          repoSource: this.build.repoSource,
          repoOwner: this.build.repoOwner,
          repoName: this.build.repoName,
          releaseVersion: this.build.buildVersion
        })
          .then(function (response) {
            // redirect to release logs?
            console.log(response)
            this.clicked = false
          })
          .catch(function (error) {
            console.log(error)
            this.clicked = false
          })
      }
    }
  }
}
</script>
