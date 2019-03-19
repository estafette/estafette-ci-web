<template>
  <div
    class="btn-group mb-3 mr-2"
    v-if="filter.labels"
  >
    <a class="btn btn-outline-light bg-btn-group-prepend icon-container">
      <font-awesome-icon icon="tag" />
    </a>
    <span class="btn btn-outline-primary border-btn-group">
      {{ filter.labels }} <router-link
        :to="{ query: { status: filter.status, since: filter.since, page: 1 } }"
        active-class="router-link-active"
        class="badge badge-primary"
      >
        &times;
      </router-link>
    </span>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTag)

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
