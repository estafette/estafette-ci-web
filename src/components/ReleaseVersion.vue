<template>
  <a
    :href="buildUrl"
    @click.stop
    class="text-body"
  >
    {{ release.releaseVersion }}
  </a>
</template>

<script>
import pipelineService from '../services/pipelineService'

export default {
  props: {
    release: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    buildUrl: '#'
  }),

  created () {
    this.fetchBuildUrl()
  },

  methods: {
    fetchBuildUrl () {
      const { repoSource, repoOwner, repoName, releaseVersion } = this.release

      pipelineService.getBuildByVersion(repoSource, repoOwner, repoName, releaseVersion)
        .then(response => {
          if (response?.data) {
            const route = this.$router.resolve({
              name: 'PipelineBuildLogs',
              params: {
                repoSource,
                repoOwner,
                repoName,
                id: response.data.id
              }
            })
            this.buildUrl = route.href
          }
        })
        .catch(error => console.error('Error fetching build by version', error))
    }
  }
}
</script>
