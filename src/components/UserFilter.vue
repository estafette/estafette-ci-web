<template>
  <b-button-group
    v-if="user && user.active"
    class="mb-3 bg-white"
  >
    <b-input-group-prepend
      is-text
      v-vk-tooltip
      title="Filter pipelines you recently committed to or released"
    >
      <font-awesome-icon
        icon="user"
      />
    </b-input-group-prepend>
    <b-button
      :to="{ query: queryGenerator({ recentCommitter: 'false', recentReleaser: 'false', page: 1 }) }"
      active-class="router-link-active"
      variant="light"
      :class="[ filter.recentCommitter === 'false' && filter.recentReleaser === 'false' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      v-vk-tooltip
      title="Everyone's pipelines"
    >
      <font-awesome-icon icon="users" />
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ recentCommitter: 'true', recentReleaser: 'false', page: 1 }) }"
      active-class="router-link-active"
      variant="light"
      :class="[ filter.recentCommitter === 'true' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      v-vk-tooltip
      title="Pipelines you recently committed to"
    >
      <font-awesome-icon icon="tools" />
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ recentCommitter: 'false', recentReleaser: 'true', page: 1 }) }"
      active-class="router-link-active"
      variant="light"
      :class="[ filter.recentReleaser === 'true' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      v-vk-tooltip
      title="Pipelines you recently released"
    >
      <font-awesome-icon icon="upload" />
    </b-button>
  </b-button-group>
</template>

<script>
import { mapState } from 'vuex'
// import { BButtonGroup, BButton, BInputGroupPrepend } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUsers, faTools, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faUsers, faTools, faUpload)

export default {
  components: {
    // BButtonGroup,
    // BButton,
    // BInputGroupPrepend,
    FontAwesomeIcon
  },

  mixins: [queryGenerator],

  props: {
    filter: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
