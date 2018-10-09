<template>
  <a :href="commitURL()" target="_blank" class="text-dark" v-on:click.stop>{{build.repoRevision | gitHash}}</a>
</template>

<script>
export default {
  props: {
    build: Object
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
