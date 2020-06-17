<template>
  <div>
    <div class="row m-0">
      <div class="col-12 text-right">
        <pagination-compact
          :pagination="pagination"
          class="float-right"
        />
      </div>
    </div>

    <b-table
      :items="entitiesProvider"
      :fields="fields"
      :per-page="pagination.size"
      :current-page="pagination.page"
      sort-icon-left
      no-provider-sorting
      striped
      hover
      borderless
      stacked="lg"
    >
      <template v-slot:cell(labels)="data">
        <labels :labels="data.item.labels" />
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="entities.length > 0"
    />
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import Labels from '@/components/Labels'

export default {
  components: {
    BTable,
    PaginationCompact,
    Pagination,
    Labels
  },

  data: function () {
    return {
      entities: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'parent',
          sortable: true,
          formatter: (value, key, item) => {
            return item.parentKey + ' = ' + item.parentValue
          }
        },
        {
          key: 'entity',
          sortable: true,
          formatter: (value, key, item) => {
            return item.key + ' = ' + item.value
          }
        },
        {
          key: 'linkedPipeline',
          sortable: true
        },
        {
          key: 'labels',
          sortable: true
        },
        {
          key: 'insertedAt',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        },
        {
          key: 'updatedAt',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        }
      ]
    }
  },

  methods: {
    entitiesProvider (ctx) {
      return this.axios.get(`/api/catalog/entities?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.entities = response.data.items
          this.pagination = response.data.pagination

          return this.entities || []
        })
    }
  }
}
</script>
