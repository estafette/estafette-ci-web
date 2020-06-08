<template>
  <div class="mb-3 compact-navigation">
    <span
      v-if="pagination.totalItems > 0"
      class="mr-2"
    >
      {{ firstPageItem }}-{{ lastPageItem }} of {{ pagination.totalItems }}
    </span>
    <b-pagination-nav
      v-if="linkGenerator"
      :number-of-pages="pagination.totalItems > 0 ? pagination.totalItems : 1"
      :link-gen="linkGenerator"
      use-router
      limit="3"
      size="md"
      hide-goto-end-buttons
      align="right"
      class="d-inline-flex"
    />
    <b-pagination
      v-else
      v-model="pagination.page"
      :total-rows="pagination.totalItems"
      :per-page="pagination.size"
      limit="3"
      size="md"
      hide-goto-end-buttons
      align="right"
      class="d-inline-flex"
    />
  </div>
</template>

<script>
import { BPaginationNav, BPagination } from 'bootstrap-vue'

export default {
  components: {
    BPaginationNav,
    BPagination
  },

  props: {
    pagination: {
      type: Object,
      default: null
    },
    linkGenerator: {
      type: Function,
      default: null
    }
  },

  computed: {
    firstPageItem: function () {
      return 1 + (this.pagination.page - 1) * this.pagination.size
    },
    lastPageItem: function () {
      return this.pagination.page * this.pagination.size < this.pagination.totalItems ? this.pagination.page * this.pagination.size : this.pagination.totalItems
    }
  }
}
</script>

<style lang="scss">
// hide page buttons
.compact-navigation {
  li {
    display: none !important;
  }

  li:first-child,
  li:last-child {
    display: block !important;
  }
}
</style>
