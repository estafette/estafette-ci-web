<template>
  <b-button-group
    class="mb-3 bg-white"
  >
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter pipelines based on it's build status"
    >
      <font-awesome-icon icon="check-circle" />
    </b-input-group-prepend>
    <b-button
      :to="{ query: queryGenerator({ status: 'all', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ filter.status === 'all' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      title="All"
    >
      <font-awesome-icon
        icon="check-double"
        class="d-md-none"
      />
      <span class="d-none d-md-inline">
        All
      </span>
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'succeeded', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-success"
      :class="[ filter.status === 'succeeded' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      title="Succeeded"
    >
      <font-awesome-icon
        icon="heart"
        class="d-md-none"
      />
      <span class="d-none d-md-inline">
        Succeeded
      </span>
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'failed', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-danger"
      :class="[ filter.status === 'failed' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      title="Failed"
    >
      <font-awesome-icon
        icon="heart-broken"
        class="d-md-none"
      />
      <span class="d-none d-md-inline">
        Failed
      </span>
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'running', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-warning"
      :class="[ filter.status === 'running' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      title="Running"
    >
      <font-awesome-icon
        icon="running"
        class="d-md-none"
      />
      <span class="d-none d-md-inline">
        Running
      </span>
    </b-button>
    <b-button
      :to="{ query: queryGenerator({ status: 'canceled', page: 1 }) }"
      active-class="router-link-active"
      variant="outline-secondary"
      :class="[ filter.status === 'canceled' ? 'active' : 'border-btn-group' ]"
      @click="(e) => e.target.blur()"
      title="Canceled"
    >
      <font-awesome-icon
        icon="ban"
        class="d-md-none"
      />
      <span class="d-none d-md-inline">
        Canceled
      </span>
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton, BInputGroupPrepend } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faCheckDouble, faRunning, faHeartBroken, faHeart, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle, faCheckDouble, faRunning, faHeart, faHeartBroken, faBan)

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
