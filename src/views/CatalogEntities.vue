<template>
  <div>
    <div class="row">
      <div class="col-6">
        <b-input-group
          class="mb-3 d-inline-flex"
          v-if="mappedKeys.length > 1"
        >
          <b-input-group-prepend
            is-text
            v-b-tooltip.hover
            title="Filter entities on key"
          >
            <font-awesome-icon icon="filter" />
          </b-input-group-prepend>
          <b-form-select
            v-model="key"
            :options="mappedKeys"
            class="d-inline-flex"
          />
        </b-input-group>
      </div>
      <div class="col-6 text-right">
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
      :filter="key"
      sort-icon-left
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
import { BTable, BInputGroup, BInputGroupPrepend, BFormSelect } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import Labels from '@/components/Labels'
import refresh from '../helpers/refresh'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilter)

export default {
  components: {
    BTable,
    BInputGroup,
    BInputGroupPrepend,
    BFormSelect,
    PaginationCompact,
    Pagination,
    Labels,
    FontAwesomeIcon
  },

  data: function () {
    return {
      key: null,
      keys: [],
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

  created () {
    this.loadKeys()
  },

  methods: {
    loadKeys () {
      this.axios.get(`/api/catalog/entity-keys?page[number]=1&page[size]=100`)
        .then(response => {
          this.keys = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadKeys, 15)
        })
    },
    entitiesProvider (ctx) {
      var filter = ''
      if (ctx.filter) {
        filter = `&filter[entity]=${ctx.filter}`
      }

      var sort = ''
      if (ctx.sortBy) {
        sort = `&sort=${ctx.sortBy}`
      } else if (ctx.sortDesc) {
        sort = `&sort=-${ctx.sortDesc}`
      }

      return this.axios.get(`/api/catalog/entities?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${filter}${sort}`)
        .then(response => {
          this.entities = response.data.items
          this.pagination = response.data.pagination

          return this.entities || []
        })
    }
  },

  computed: {
    mappedKeys () {
      if (!this.keys) {
        return []
      }

      return [{ value: null, text: 'Entity key' }].concat(this.keys.map(k => {
        return {
          value: `${k.key}`,
          text: `${k.key} (${k.count})`
        }
      }))
    }
  }
}
</script>
