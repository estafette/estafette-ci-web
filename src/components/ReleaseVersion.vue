<template>
  <router-link
    to="#"
    @click.native.prevent="navigateToBuildLogs(release.releaseVersion)"
    :class="['text-body']"
  >
    {{ release.releaseVersion }}
  </router-link>
</template>

<script>
import pipelineService from '../services/pipelineService'

export default {
  props: {
    release: {
      type: Object,
      default: null
    }
  },

  methods: {
    navigateToBuildLogs (version) {
      pipelineService.getBuildByVersion(
        this.release.repoSource,
        this.release.repoOwner,
        this.release.repoName,
        version
      )
        .then(response => {
          if (response && response.data) {
            this.$router.push({
              name: 'PipelineBuildLogs',
              params: {
                repoSource: this.release.repoSource,
                repoOwner: this.release.repoOwner,
                repoName: this.release.repoName,
                id: response.data.id
              }
            })
          }
        })
        .catch(error => {
          console.error('Error fetching build by version', error)
        })
    }
  }
}
</script>
