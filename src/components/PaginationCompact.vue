<template>
  <div>
    <div class="d-inline-flex mr-2">
      {{ firstPageItem }}-{{ lastPageItem }} of {{ pagination.totalItems }}
    </div>

    <nav class="d-inline-flex">
      <ul class="pagination m-0 p-0">
        <li
          class="page-item"
          :class="{ disabled: pagination.page <= 1 }"
        >
          <router-link
            :to="linkGenerator(pagination.page-1)"
            class="page-link"
          >
            ‹
          </router-link>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagination.page >= pagination.totalPages }"
        >
          <router-link
            :to="linkGenerator(pagination.page+1)"
            class="page-link"
          >
            ›
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    linkGenerator: {
      type: Function,
      default: null
    },
    pagination: {
      type: Object,
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
