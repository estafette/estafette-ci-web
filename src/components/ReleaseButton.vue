<template>
  <b-dropdown size="sm" v-if="user && user.authenticated && pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'" id="releaseAction" text="Release to..." variant="outline-dark">
    <div v-for="releaseTarget in pipeline.releaseTargets" v-bind:key="releaseTarget.name">
      <div role="group" v-if="hasActions(releaseTarget)" :aria-labelledby="releaseTarget.name">
        <b-dropdown-header :id="releaseTarget.name">{{releaseTarget.name}}:</b-dropdown-header>
        <b-dropdown-item-button v-for="action in releaseTarget.actions" v-bind:key="releaseTarget.name+'-'+action.name" v-on:click.stop="startRelease(releaseTarget, action, $event)" :disabled="releaseTargetDisabled(releaseTarget)" :aria-describedby="releaseTarget.name">- {{action.name}}</b-dropdown-item-button>
      </div>
      <b-dropdown-item-button v-if="!hasActions(releaseTarget)" v-bind:key="releaseTarget.name" v-on:click.stop="startRelease(releaseTarget, null, $event)" :disabled="releaseTargetDisabled(releaseTarget)">{{releaseTarget.name}}</b-dropdown-item-button>
    </div>
  </b-dropdown>
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
    releaseTargetDisabled: function (releaseTarget) {
      return this.pipeline &&
             this.pipeline.releaseTargets &&
             this.pipeline.releaseTargets.length > 0 &&
             this.pipeline.releaseTargets.some(rt => rt.name === releaseTarget.name && rt.activeReleases && rt.activeReleases.some(ar => ar && ar.releaseStatus === 'running'))
    },

    startRelease: function (releaseTarget, action, event) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/releases`, {
          name: releaseTarget.name,
          action: action ? action.name : '',
          repoSource: this.build.repoSource,
          repoOwner: this.build.repoOwner,
          repoName: this.build.repoName,
          releaseVersion: this.build.buildVersion
        })
          .then(response => {
            console.log(response)
            var startedRelease = response.data

            var releaseTarget = this.pipeline.releaseTargets.find(rt => rt.name === startedRelease.name)
            if (releaseTarget) {
              if (!releaseTarget.activeReleases) {
                releaseTarget.activeReleases = [startedRelease]
              } else {
                // remove active release item if name and optional action matches the just started release
                releaseTarget.activeReleases = releaseTarget.activeReleases.filter(r => r.action && startedRelease.action && r.action !== startedRelease.action)

                // prepend newly started release
                releaseTarget.activeReleases.unshift(startedRelease)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    hasActions: function (releaseTarget) {
      return releaseTarget && releaseTarget.actions && releaseTarget.actions.length > 0
    }
  }
}
</script>

<style scoped>
.dropdown-header {
  color: #6c757d;
  font-weight: 400;
  font-size: inherit;
}
</style>
