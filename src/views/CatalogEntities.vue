<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-xl-3">
        <b-input-group
          class="mb-3 d-inline-flex"
          v-if="mappedParentKeys.length > 1"
        >
          <b-input-group-prepend
            is-text
            v-b-tooltip.hover
            title="Filter entities on key"
          >
            <font-awesome-icon icon="sitemap" />
          </b-input-group-prepend>
          <b-form-select
            v-model="parent"
            :options="mappedParentKeys"
            @change="refreshEntities"
            class="d-inline-flex"
          />
        </b-input-group>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <b-input-group
          class="mb-3 d-inline-flex"
          v-if="mappedEntityKeys.length > 1"
        >
          <b-input-group-prepend
            is-text
            v-b-tooltip.hover
            title="Filter entities on key"
          >
            <font-awesome-icon icon="cube" />
          </b-input-group-prepend>
          <b-form-select
            v-model="entity"
            :options="mappedEntityKeys"
            @change="refreshEntities"
            class="d-inline-flex"
          />
        </b-input-group>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <b-input-group
          class="mb-3 d-inline-flex"
          v-if="mappedLabels.length > 1"
        >
          <b-input-group-prepend
            is-text
            v-b-tooltip.hover
            title="Filter entities on labels"
          >
            <font-awesome-icon icon="tags" />
          </b-input-group-prepend>
          <b-form-select
            v-model="label"
            :options="mappedLabels"
            @change="refreshEntities"
            class="d-inline-flex"
          />
        </b-input-group>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
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
import { faSitemap, faCube, faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSitemap, faCube, faTags)

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
          key: 'parent_value',
          label: 'Parent',
          sortable: true,
          formatter: (value, key, item) => {
            return item.parentKey + ' = ' + item.parentValue
          }
        },
        {
          key: 'entity_value',
          label: 'Entity',
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
      this.axios.get(`/api/catalog/entity-parent-keys?page[number]=1&page[size]=100`)
        .then(response => {
          this.parentKeys = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadParentKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadParentKeys, 15)
        })
    },
    loadEntityKeys () {
      this.axios.get(`/api/catalog/entity-keys?page[number]=1&page[size]=100`)
        .then(response => {
          this.entityKeys = response.data.items
          // refresh.timeoutWithJitter(this.timeout, this.loadEntityKeys, 30)
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadEntityKeys, 15)
        })
    },
    loadLabels () {
      this.axios.get(`/api/catalog/entity-labels?page[number]=1&page[size]=100`)
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
      this.$refs.entities.refresh()
    }
  },

  computed: {
    mappedParentKeys () {
      if (!this.parentKeys) {
        return []
      }

      return [{ value: null, text: 'Parent key' }].concat(this.parentKeys.map(k => {
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

      return [{ value: null, text: 'Entity key' }].concat(this.entityKeys.map(k => {
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

      return [{ value: null, text: 'Entity label' }].concat(this.labels.map(l => {
        return {
          value: `${l.key}=${l.value}`,
          text: `${l.key}=${l.value} (${l.count})`
        }
      }))
    }
  }
}
</script>
