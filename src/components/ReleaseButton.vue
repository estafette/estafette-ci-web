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
    <b-modal
      ref="my-modal"
      hide-footer
      title="Release restricted"
    >
      <div
        class="d-block text-center"
        v-if="error"
      >
        <h4>
          Release to '{{ error.cluster }}' is restricted
          <br>
          from this branch!
        </h4>
        <div
          class="text-left"
          v-if="error.repositoryReleaseControl.allowed && error.repositoryReleaseControl.allowed.length > 0"
        >
          Allowed branches
        </div>
        <ul
          class="text-left"
          v-if="error.repositoryReleaseControl.allowed && error.repositoryReleaseControl.allowed.length > 0"
        >
          <li
            v-for="branch in error.repositoryReleaseControl.allowed"
            :key="branch"
          >
            {{ branch }}
          </li>
        </ul>
        <div
          class="text-left"
          v-if="error.repositoryReleaseControl.blocked && error.repositoryReleaseControl.blocked.length > 0"
        >
          Blocked branches
        </div>
        <ul
          class="text-left"
          v-if="error.repositoryReleaseControl.blocked && error.repositoryReleaseControl.blocked.length > 0"
        >
          <li
            v-for="branch in error.repositoryReleaseControl.blocked"
            :key="branch"
          >
            {{ branch }}
          </li>
        </ul>
      </div>
      <b-button
        block
        class="mt-3"
        variant="outline-danger"
        @click="hideModal"
      >
        Close
      </b-button>
    </b-modal>
  </b-input-group>
</template>

<script>
import { mapState } from 'vuex'
import {
  BDropdown,
  BDropdownHeader,
  BDropdownItemButton,
  BInputGroup,
  BInputGroupText,
  BModal,
  BButton
} from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload)

const releaseNotAllowed = 'Release not allowed on this branch'

export default {
  components: {
    BDropdown,
    BDropdownHeader,
    BDropdownItemButton,
    BInputGroup,
    BInputGroupText,
    FontAwesomeIcon,
    BModal,
    BButton
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
      clicked: false,
      error: {
        cluster: '',
        repositoryReleaseControl: {
          allowed: [],
          blocked: []
        }
      }
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
            if (e.message === releaseNotAllowed) {
              this.error = e
              this.$refs['my-modal'].show()
            } else {
              console.warn('123', e)
            }
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
    },

    hideModal: function () {
      this.$refs['my-modal'].hide()
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
