<template>
  <a
    :href="commitURL()"
    target="_blank"
    :class="[dashboardModeActive ? $options.filters.bootstrapTextClass(build.buildStatus) : 'text-body']"
    @click.stop
  >
    {{ build.repoRevision | gitHash }}
  </a>
</template>

<script>
export default {
  props: {
    build: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    commitURL: function () {
      switch (this.build.repoSource) {
        case 'github.com':
          return `https://github.com/${this.build.repoOwner}/${this.build.repoName}/commit/${this.build.repoRevision}`

        case 'bitbucket.org':
          return `https://bitbucket.org/${this.build.repoOwner}/${this.build.repoName}/commits/${this.build.repoRevision}`
      }
      return '#'
    }
  }
}
</script>
