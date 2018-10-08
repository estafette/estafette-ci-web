<template>
  <span v-if="release">
    <button exact class="btn btn-outline-dark btn mr-1 mb-1" v-on:click.stop="startRelease">
      {{release.name}}
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
  methods: {
    startRelease: function (event) {
      if (this.user.authenticated) {
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
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>
