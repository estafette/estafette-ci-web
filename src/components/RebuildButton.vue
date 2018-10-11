<template>
  <div v-if="user.authenticated && build && build.buildStatus === 'failed'" class="btn btn-outline-dark btn-sm">Rebuild</div>
</template>

<script>
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
    startRelease: function (release, event) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds`, this.build)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
