<template>
  <b-input-group
    v-if="user && user.authenticated && pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'"
    style="width: auto;"
  >
    <b-input-group-text
      slot="prepend"
      class="border border-secondary text-secondary bg-white"
      @click.stop=""
    >
      <font-awesome-icon icon="upload" />
    </b-input-group-text>
    <b-dropdown
      size="sm"
      id="releaseAction"
      text="Release to..."
      variant="outline-secondary"
    >
      <div
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
      >
        <div
          role="group"
          v-if="hasActions(releaseTarget)"
          :aria-labelledby="releaseTarget.name"
        >
          <b-dropdown-header :id="releaseTarget.name">
            {{ releaseTarget.name }}:
          </b-dropdown-header>
          <b-dropdown-item-button
            v-for="action in releaseTarget.actions"
            :key="releaseTarget.name+'-'+action.name"
            @click.stop="startRelease(releaseTarget, action, $event)"
            :disabled="releaseTargetDisabled(releaseTarget)"
            :aria-describedby="releaseTarget.name"
          >
            - {{ action.name }}
          </b-dropdown-item-button>
        </div>
        <b-dropdown-item-button
          v-if="!hasActions(releaseTarget)"
          :key="releaseTarget.name"
          @click.stop="startRelease(releaseTarget, null, $event)"
          :disabled="releaseTargetDisabled(releaseTarget)"
        >
          {{ releaseTarget.name }}
        </b-dropdown-item-button>
      </div>
    </b-dropdown>
  </b-input-group>
</template>

<script>
import { BDropdown, BDropdownHeader, BDropdownItemButton, BInputGroup, BInputGroupText } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload)

export default {
  components: {
    BDropdown,
    BDropdownHeader,
    BDropdownItemButton,
    BInputGroup,
    BInputGroupText,
    FontAwesomeIcon
  },
  props: {
    pipeline: {
      type: Object,
      default: null
    },
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
    releaseTargetDisabled: function (releaseTarget) {
      return this.pipeline &&
             this.pipeline.releaseTargets &&
             this.pipeline.releaseTargets.length > 0 &&
             this.pipeline.releaseTargets.some(rt => rt.name === releaseTarget.name && rt.activeReleases && rt.activeReleases.some(ar => ar && ar.releaseStatus === 'running'))
    },

    startRelease: function (releaseTarget, action, event) {
      if (this.user.authenticated) {
        var startedRelease = {
          name: releaseTarget.name,
          action: action ? action.name : '',
          repoSource: this.build.repoSource,
          repoOwner: this.build.repoOwner,
          repoName: this.build.repoName,
          releaseVersion: this.build.buildVersion,
          releaseStatus: 'pending'
        }
        this.updateRelease(startedRelease)

        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/releases`, startedRelease)
          .then(response => {
            console.log(response)
            startedRelease = response.data
            this.updateRelease(startedRelease)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    updateRelease (startedRelease) {
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
