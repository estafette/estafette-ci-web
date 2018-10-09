<template>
  <b-dropdown v-if="user && user.authenticated && build.releases && build.releases.length > 0 && build.buildStatus === 'succeeded'" id="releaseAction" text="Release to..." variant="outline-dark" class="mr-1 mb-1">
    <b-dropdown-item-button v-for="release in build.releases" v-bind:key="release.name" v-on:click.stop="startRelease(release, $event)" :disabled="releaseTargetDisabled(release)">{{release.name}}</b-dropdown-item-button>
  </b-dropdown>
  <span v-else class="d-xxl-none">-</span>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    pipeline: Object,
    build: Object,
    user: Object
  },
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    releaseTargetDisabled: function (release) {
      if (this.pipeline && this.pipeline.releases && this.pipeline.releases.length > 0) {
        return this.pipeline.releases.some(r => r.name === release.name && r.releaseStatus === 'running')
      }
      return false
    },

    startRelease: function (release, event) {
      if (this.user.authenticated) {
        axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/releases`, {
          name: release.name,
          repoSource: this.build.repoSource,
          repoOwner: this.build.repoOwner,
          repoName: this.build.repoName,
          releaseVersion: this.build.buildVersion
        })
          .then(function (response) {
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
