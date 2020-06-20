<template>
  <div>
    <div class="row">
      <div class="col-12">
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
      striped
      hover
      borderless
      stacked="lg"
      ref="entities"
    >
      <template v-slot:top-row>
        <b-td>
          <b-form-select
            v-model="parent"
            :options="mappedParentKeys"
            @change="refreshEntities"
          />
        </b-td>
        <b-td />
        <b-td>
          <b-form-select
            v-model="entity"
            :options="mappedEntityKeys"
            @change="refreshEntities"
          />
        </b-td>
        <b-td />
        <b-td />
        <b-td>
          <b-form-select
            v-model="label"
            :options="mappedLabels"
            @change="refreshEntities"
            class="d-inline-flex"
          />
        </b-td>
        <b-td />
        <b-td />
      </template>
      <template v-slot:cell(parent_key)="data">
        <span class="text-muted w-50">{{ data.item.parentKey }}</span>
      </template>
      <template v-slot:cell(parent_value)="data">
        {{ data.item.parentValue }}
      </template>
      <template v-slot:cell(entity_key)="data">
        <span class="text-muted w-50">{{ data.item.key }}</span>
      </template>
      <template v-slot:cell(entity_value)="data">
        {{ data.item.value }}
      </template>
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
import { BTable, BFormSelect, BTd } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import Labels from '@/components/Labels'
import refresh from '../helpers/refresh'

export default {
  components: {
    BTable,
    BTd,
    BFormSelect,
    PaginationCompact,
    Pagination,
    Labels
  },

  data: function () {
    return {
      parent: null,
      parentKeys: [],
      entity: null,
      entityKeys: [],
      label: null,
      labels: [],
      entities: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'parent_key',
          sortable: true
        },
        {
          key: 'parent_value',
          sortable: true
        },
        {
          key: 'entity_key',
          sortable: true
        },
        {
          key: 'entity_value',
          sortable: true
        },
        {
          key: 'linkedPipeline',
          sortable: true
        },
        {
          key: 'labels'
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
    this.loadParentKeys()
    this.loadEntityKeys()
    this.loadLabels()
  },

  methods: {
    loadParentKeys () {
      var entityFilter = ''
      if (this.entity) {
        entityFilter = `&filter[entity]=${this.entity}`
      }

      var labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-parent-keys?page[number]=1&page[size]=100${entityFilter}${labelFilter}`)
        .then(response => {
          this.parentKeys = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadParentKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadParentKeys, 15)
        })
    },
    loadEntityKeys () {
      var parentFilter = ''
      if (this.parent) {
        parentFilter = `&filter[parent]=${this.parent}`
      }

      var labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-keys?page[number]=1&page[size]=100${parentFilter}${labelFilter}`)
        .then(response => {
          this.entityKeys = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadEntityKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadEntityKeys, 15)
        })
    },
    loadLabels () {
      var parentFilter = ''
      if (this.parent) {
        parentFilter = `&filter[parent]=${this.parent}`
      }

      var entityFilter = ''
      if (this.entity) {
        entityFilter = `&filter[entity]=${this.entity}`
      }

      this.axios.get(`/api/catalog/entity-labels?page[number]=1&page[size]=100${parentFilter}${entityFilter}`)
        .then(response => {
          this.labels = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadKeys, 15)
        })
    },
    entitiesProvider (ctx) {
      var parentFilter = ''
      if (this.parent) {
        parentFilter = `&filter[parent]=${this.parent}`
      }

      var entityFilter = ''
      if (this.entity) {
        entityFilter = `&filter[entity]=${this.entity}`
      }

      var labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      var sort = ''
      if (ctx.sortBy) {
        sort += '&sort='
        if (ctx.sortDesc) {
          sort += '-'
        }
        sort += `${ctx.sortBy}`
      }

      return this.axios.get(`/api/catalog/entities?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${parentFilter}${entityFilter}${labelFilter}${sort}`)
        .then(response => {
          this.entities = response.data.items
          this.pagination = response.data.pagination

          return this.entities || []
        })
    },
    refreshEntities (value) {
      this.loadParentKeys()
      this.loadEntityKeys()
      this.loadLabels()

      this.$refs.entities.refresh()
    }
  },

  computed: {
    mappedParentKeys () {
      if (!this.parentKeys) {
        return []
      }

      return [{ value: null, text: 'Unfiltered' }].concat(this.parentKeys.map(k => {
        return {
          value: `${k.key}`,
          text: `${k.key} (${k.count})`
        }
      }))
    },
    mappedEntityKeys () {
      if (!this.entityKeys) {
        return []
      }

      return [{ value: null, text: 'Unfiltered' }].concat(this.entityKeys.map(k => {
        return {
          value: `${k.key}`,
          text: `${k.key} (${k.count})`
        }
      }))
    },
    mappedLabels () {
      if (!this.labels) {
        return []
      }

      return [{ value: null, text: 'Unfiltered' }].concat(this.labels.map(l => {
        return {
          value: `${l.key}=${l.value}`,
          text: `${l.key}=${l.value} (${l.count})`
        }
      }))
    }
  }
}
</script>
