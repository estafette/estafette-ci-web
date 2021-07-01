<template>
  <font-awesome-icon
    v-if="supported"
    :icon="['fab', icon]"
    v-b-tooltip.hover
    title="This stage uses a known extension image"
  />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBitbucket, faCloudflare, faDocker, faGit, faGithub, faJava, faNode, faNpm, faPhp, faPython, faSlack, faRust } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDocker, faGit, faSlack, faGithub, faBitbucket, faNpm, faCloudflare, faJava, faNode, faPhp, faPython, faRust)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    image: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      icons: {
        'extensions/docker': 'docker',
        'extensions/git-clone': 'git',
        'extensions/slack-build-status': 'slack',
        'extensions/github-status': 'github',
        'extensions/github-release': 'github',
        'extensions/bot-github': 'github',
        'extensions/bitbucket-status': 'bitbucket',
        'extensions/npm-audit': 'npm',
        'extensions/cloudflare-purge': 'cloudflare',
        openjdk: 'java',
        adoptopenjdk: 'java',
        node: 'node',
        php: 'php',
        python: 'python',
        docker: 'docker',
        rust: 'rust'
      }
    }
  },
  computed: {
    supported () {
      return this.image && this.image.name && this.image.name in this.icons
    },
    icon () {
      return this.icons[this.image.name]
    }
  }
}
</script>
