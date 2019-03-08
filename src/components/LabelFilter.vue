<template>
  <div
    class="btn-group mb-3"
    v-if="filter.labels"
  >
    <a class="btn btn-outline-light bg-btn-group-prepend">
      <font-awesome-icon icon="tag" />
    </a>
    <span class="btn btn-outline-secondary border-btn-group">
      {{ filter.labels }} <router-link
        :to="{ query: { status: filter.status, since: filter.since, page: 1 } }"
        active-class="router-link-active"
        class="badge badge-secondary"
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
