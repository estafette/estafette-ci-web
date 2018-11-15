<template>
  <div v-if="user.authenticated && ((build && build.buildStatus === 'running') || (release && release.releaseStatus === 'running'))" class="btn btn-outline-danger btn-sm" v-on:click.stop="rebuild">Cancel</div>
</template>

<script>
export default {
  props: {
    build: Object,
    release: Object,
    user: Object
  },
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    rebuild: function (event) {
      if (this.user.authenticated) {
        if (this.build && this.build.buildStatus === 'running') {
          this.axios.delete(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds/${this.build.id}`)
            .then(response => {
              this.build.buildStatus = 'canceling'
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        } else if (this.release && this.release.releaseStatus === 'running') {
          this.axios.delete(`/api/pipelines/${this.release.repoSource}/${this.release.repoOwner}/${this.release.repoName}/releases/${this.release.id}`)
            .then(response => {
              this.release.releaseStatus = 'canceling'
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>
