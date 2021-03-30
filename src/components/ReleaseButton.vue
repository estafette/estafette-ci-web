<template>
  <b-input-group
    v-if="user && user.active && pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'"
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
import { mapState } from 'vuex'
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
      if (this.user.active) {
        let startedRelease = {
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
            startedRelease = response.data
            this.updateRelease(startedRelease)
          })
          .catch(e => {
            console.warn(e)
          })
      }
    },

    updateRelease (startedRelease) {
      const releaseTarget = this.pipeline.releaseTargets.find(rt => rt.name === startedRelease.name)
      if (releaseTarget) {
        if (!releaseTarget.activeReleases) {
          releaseTarget.activeReleases = [startedRelease]
        } else {
          // replace corresponding active release with started release
          let hasMatchingActiveRelease = false
          const newActiveReleases = releaseTarget.activeReleases.map(r => {
            // if there's no actions on the active releases there's just one and it's a match, so replace it
            if (!r.action) {
              hasMatchingActiveRelease = true
              return startedRelease
            }

            // otherwise it has to match the action
            if (startedRelease.action && r.action === startedRelease.action) {
              hasMatchingActiveRelease = true
              return startedRelease
            }

            // any of the other release targets stay the same
            return r
          })

          if (!hasMatchingActiveRelease) {
            newActiveReleases.push(startedRelease)
          }

          // atomically update active releases
          releaseTarget.activeReleases = newActiveReleases
        }
      }
    },

    hasActions: function (releaseTarget) {
      return releaseTarget && releaseTarget.actions && releaseTarget.actions.length > 0
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
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
