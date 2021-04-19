<template>
  <div class="row-header">
    <div
      v-for="f in fields"
      :key="f.name"
      :class="f.class"
    >
      <router-link
        v-if="f.isSortable"
        :to="{ query: queryGenerator(f.sortingQueryParams) }"
        active-class="router-link-active"
        tag="span"
        class="clickable"
      >
        {{ f.name }}
        <font-awesome-icon
          icon="sort"
        />
      </router-link>
      <span v-else>
        {{ f.name }}
      </span>
    </div>
  </div>
</template>

<script>
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSort)

export default {
  components: {
    FontAwesomeIcon
  },

  mixins: [queryGenerator],

  props: {
    fields: {
      type: Array,
      default: function () { return [] }
    }
  }
}
</script>
