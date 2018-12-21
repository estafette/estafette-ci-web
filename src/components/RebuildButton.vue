<template>
  <div
    v-if="user.authenticated && build && (build.buildStatus === 'failed' || build.buildStatus === 'canceled')"
    class="btn btn-outline-success btn-sm"
    @click.stop="rebuild"
  >
    Rebuild
  </div>
</template>

<script>
export default {
  props: {
    build: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    rebuild: function (event) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds`, this.build)
          .then(response => {
            this.build.buildStatus = 'running'
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
