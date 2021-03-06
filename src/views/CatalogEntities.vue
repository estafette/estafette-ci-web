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
      <template #top-row>
        <b-td>
          <label
            for="parent-key"
            class="font-weight-bold d-lg-none"
          >
            Parent Key
          </label>
          <b-form-select
            id="parent-key"
            v-model="parentKey"
            :options="mappedParentKeys"
            @change="updateParentKey"
          />
        </b-td>
        <b-td>
          <label
            v-if="parentKey"
            for="parent-value"
            class="font-weight-bold d-lg-none"
          >
            Parent Value
          </label>
          <b-form-select
            v-if="parentKey"
            id="parent-value"
            v-model="parentValue"
            :options="mappedParentValues"
            @change="refreshEntities"
          />
        </b-td>
        <b-td>
          <label
            for="entity-key"
            class="font-weight-bold d-lg-none"
          >
            Entity Key
          </label>
          <b-form-select
            id="entity-key"
            v-model="entityKey"
            :options="mappedEntityKeys"
            @change="updateEntityKey"
          />
        </b-td>
        <b-td>
          <label
            v-if="entityKey"
            for="entity-value"
            class="font-weight-bold d-lg-none"
          >
            Entity Value
          </label>
          <b-form-select
            v-if="entityKey"
            id="entity-value"
            v-model="entityValue"
            :options="mappedEntityValues"
            @change="refreshEntities"
          />
        </b-td>
        <b-td class="d-none d-lg-table-cell" />
        <b-td>
          <label
            for="labels"
            class="font-weight-bold d-lg-none"
          >
            Labels
          </label>
          <b-form-select
            id="labels"
            v-model="label"
            :options="mappedLabels"
            @change="refreshEntities"
            class="d-inline-flex"
          />
        </b-td>
        <b-td class="d-none d-lg-table-cell" />
        <b-td class="d-none d-lg-table-cell" />
      </template>
      <template #cell(parent_key)="data">
        <span class="text-muted w-50">{{ data.item.parentKey }}</span>
      </template>
      <template #cell(parent_value)="data">
        {{ data.item.parentValue }}
      </template>
      <template #cell(entity_key)="data">
        <span class="text-muted w-50">{{ data.item.key }}</span>
      </template>
      <template #cell(entity_value)="data">
        {{ data.item.value }}
      </template>
      <template #cell(labels)="data">
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

  props: {
    query: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      parentKey: null,
      parentKeys: [],
      parentValue: null,
      parentValues: [],
      entityKey: null,
      entityKeys: [],
      entityValue: null,
      entityValues: [],
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
    this.setDataFromQueryParams()

    this.loadParentKeys()
    this.loadParentValues()
    this.loadEntityKeys()
    this.loadEntityValues()
    this.loadLabels()
  },

  methods: {
    setDataFromQueryParams () {
      if (this.query.parent) {
        const parentParts = this.query.parent.split('=')
        this.parentKey = parentParts.length > 0 ? parentParts[0] : null
        this.parentValue = parentParts.length > 1 ? parentParts[1] : null
      }
      if (this.query.entity) {
        const entityParts = this.query.entity.split('=')
        this.entityKey = entityParts.length > 0 ? entityParts[0] : null
        this.entityValue = entityParts.length > 1 ? entityParts[1] : null
      }
      if (this.query.label) {
        this.label = this.query.label
      }
    },
    setQueryParamsFromData () {
      const query = { ...this.$route.query }

      if (this.parentKey) {
        query.parent = this.parentKey
        if (this.parentValue) {
          query.parent += `=${this.parentValue}`
        }
      } else if (query.parent) {
        delete query.parent
      }

      if (this.entityKey) {
        query.entity = this.entityKey
        if (this.entityValue) {
          query.entity += `=${this.entityValue}`
        }
      } else if (query.entity) {
        delete query.entity
      }

      if (this.label) {
        query.label = this.label
      } else if (query.label) {
        delete query.label
      }

      this.$router.push({ query: query })
    },
    loadParentKeys () {
      let entityFilter = ''
      if (this.entityKey) {
        entityFilter = `&filter[entity]=${this.entityKey}`
        if (this.entityValue) {
          entityFilter += `=${this.entityValue}`
        }
      }

      let labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-parent-keys?page[number]=1&page[size]=100${entityFilter}${labelFilter}`)
        .then(response => {
          this.parentKeys = response.data.items
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadParentKeys, 15)
        })
    },
    loadParentValues () {
      let parentFilter = ''
      if (this.parentKey) {
        parentFilter = `&filter[parent]=${this.parentKey}`
      }

      let entityFilter = ''
      if (this.entityKey) {
        entityFilter = `&filter[entity]=${this.entityKey}`
        if (this.entityValue) {
          entityFilter += `=${this.entityValue}`
        }
      }

      let labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-parent-values?page[number]=1&page[size]=100${parentFilter}${entityFilter}${labelFilter}`)
        .then(response => {
          this.parentValues = response.data.items
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadParentValues, 15)
        })
    },
    loadEntityKeys () {
      let parentFilter = ''
      if (this.parentKey) {
        parentFilter = `&filter[parent]=${this.parentKey}`
        if (this.parentValue) {
          parentFilter += `=${this.parentValue}`
        }
      }

      let labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-keys?page[number]=1&page[size]=100${parentFilter}${labelFilter}`)
        .then(response => {
          this.entityKeys = response.data.items
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadEntityKeys, 15)
        })
    },
    loadEntityValues () {
      let parentFilter = ''
      if (this.parentKey) {
        parentFilter = `&filter[parent]=${this.parentKey}`
        if (this.parentValue) {
          parentFilter += `=${this.parentValue}`
        }
      }

      let entityFilter = ''
      if (this.entityKey) {
        entityFilter = `&filter[entity]=${this.entityKey}`
      }

      let labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      this.axios.get(`/api/catalog/entity-values?page[number]=1&page[size]=100${parentFilter}${entityFilter}${labelFilter}`)
        .then(response => {
          this.entityValues = response.data.items
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadEntityValues, 15)
        })
    },
    loadLabels () {
      let parentFilter = ''
      if (this.parentKey) {
        parentFilter = `&filter[parent]=${this.parentKey}`
        if (this.parentValue) {
          parentFilter += `=${this.parentValue}`
        }
      }

      let entityFilter = ''
      if (this.entityKey) {
        entityFilter = `&filter[entity]=${this.entityKey}`
        if (this.entityValue) {
          entityFilter += `=${this.entityValue}`
        }
      }

      this.axios.get(`/api/catalog/entity-labels?page[number]=1&page[size]=100${parentFilter}${entityFilter}`)
        .then(response => {
          this.labels = response.data.items
        })
        .catch(e => {
          refresh.timeoutWithJitter(this.timeout, this.loadKeys, 15)
        })
    },
    entitiesProvider (ctx) {
      let parentFilter = ''
      if (this.parentKey) {
        parentFilter = `&filter[parent]=${this.parentKey}`
        if (this.parentValue) {
          parentFilter += `=${this.parentValue}`
        }
      }

      let entityFilter = ''
      if (this.entityKey) {
        entityFilter = `&filter[entity]=${this.entityKey}`
        if (this.entityValue) {
          entityFilter += `=${this.entityValue}`
        }
      }

      let labelFilter = ''
      if (this.label) {
        labelFilter = `&filter[labels]=${this.label}`
      }

      let sort = ''
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
    updateParentKey () {
      this.parentValue = null
      this.refreshEntities()
    },
    updateEntityKey () {
      this.entityValue = null
      this.refreshEntities()
    },
    refreshEntities () {
      this.setQueryParamsFromData()

      this.loadParentKeys()
      this.loadParentValues()
      this.loadEntityKeys()
      this.loadEntityValues()
      this.loadLabels()

      this.$refs.entities.refresh()
    }
  },

  computed: {
    mappedParentKeys () {
      if (!this.parentKeys) {
        return []
      }

      return [{ value: null, text: '--' }].concat(this.parentKeys.map(k => {
        return {
          value: `${k.key}`,
          text: `${k.key} (${k.count})`
        }
      }))
    },
    mappedParentValues () {
      if (!this.parentValues) {
        return []
      }

      return [{ value: null, text: '--' }].concat(this.parentValues.map(k => {
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

      return [{ value: null, text: '--' }].concat(this.entityKeys.map(k => {
        return {
          value: `${k.key}`,
          text: `${k.key} (${k.count})`
        }
      }))
    },
    mappedEntityValues () {
      if (!this.entityValues) {
        return []
      }

      return [{ value: null, text: '--' }].concat(this.entityValues.map(k => {
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

      return [{ value: null, text: '--' }].concat(this.labels.map(l => {
        return {
          value: `${l.key}=${l.value}`,
          text: `${l.key}=${l.value} (${l.count})`
        }
      }))
    }
  },

  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
}
</script>
