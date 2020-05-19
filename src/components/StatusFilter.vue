<template>
  <b-button-group
    class="mb-3 bg-white"
  >
    <b-input-group-prepend
      is-text
    >
      <font-awesome-icon icon="check-circle" />
    </b-input-group-prepend>
    <b-button
      :to="{ query: { status: 'all', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ filter.status === 'all' ? 'active' : 'border-btn-group bg-white' ]"
      @click="this.blur()"
    >
      All
    </b-button>
    <b-button
      :to="{ query: { status: 'succeeded', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      variant="outline-success"
      :class="[ filter.status === 'succeeded' ? 'active' : 'border-btn-group' ]"
    >
      Succeeded
    </b-button>
    <b-button
      :to="{ query: { status: 'failed', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      variant="outline-danger"
      :class="[ filter.status === 'failed' ? 'active' : 'border-btn-group' ]"
    >
      Failed
    </b-button>
    <b-button
      :to="{ query: { status: 'running', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      variant="outline-warning"
      :class="[ filter.status === 'running' ? 'active' : 'border-btn-group' ]"
    >
      Running
    </b-button>
    <b-button
      :to="{ query: { status: 'canceled', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      variant="outline-secondary"
      :class="[ filter.status === 'canceled' ? 'active' : 'border-btn-group' ]"
    >
      Canceled
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle)

export default {
  components: {
    BButtonGroup,
    BButton,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    filter: {
      type: Object,
      default: null
    }
  }
}
</script>
