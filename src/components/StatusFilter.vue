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
      :to="{ query: queryGenerator({ status: 'all', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ filter.status === 'all' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
    >
      All
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'succeeded', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-success"
      :class="[ filter.status === 'succeeded' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
    >
      Succeeded
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'failed', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-danger"
      :class="[ filter.status === 'failed' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
    >
      Failed
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'running', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-warning"
      :class="[ filter.status === 'running' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
    >
      Running
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'canceled', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-secondary"
      :class="[ filter.status === 'canceled' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
    >
      Canceled
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton, BInputGroupPrepend } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

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

  mixins: [queryGenerator],

  props: {
    filter: {
      type: Object,
      default: null
    }
  }
}
</script>
