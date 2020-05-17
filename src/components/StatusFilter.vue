<template>
  <div class="btn-group mb-3">
    <a class="btn btn-outline-light bg-btn-group-prepend icon-container">
      <font-awesome-icon icon="check-circle" />
    </a>
    <router-link
      :to="{ query: { status: 'all', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      class="btn btn-outline-primary"
      :class="[ filter.status === 'all' ? 'active' : 'border-btn-group bg-white' ]"
      @click="this.blur()"
    >
      All
    </router-link>
    <router-link
      :to="{ query: { status: 'succeeded', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      class="btn btn-outline-success"
      :class="[ filter.status === 'succeeded' ? 'active' : 'border-btn-group bg-white' ]"
    >
      Succeeded
    </router-link>
    <router-link
      :to="{ query: { status: 'failed', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      class="btn btn-outline-danger"
      :class="[ filter.status === 'failed' ? 'active' : 'border-btn-group bg-white' ]"
    >
      Failed
    </router-link>
    <router-link
      :to="{ query: { status: 'running', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      class="btn btn-outline-warning"
      :class="[ filter.status === 'running' ? 'active' : 'border-btn-group bg-white' ]"
    >
      Running
    </router-link>
    <router-link
      :to="{ query: { status: 'canceled', since: filter.since, search: filter.search, labels: filter.labels, page: 1 } }"
      active-class="router-link-active"
      class="btn btn-outline-secondary"
      :class="[ filter.status === 'canceled' ? 'active' : 'border-btn-group bg-white' ]"
    >
      Canceled
    </router-link>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle)

export default {
  components: {
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
