<template>
  <div>
    <div class="row">
      <div class="col-6">
        <pipeline-filter
          :model="filter.search"
          :on-input="setSearch"
        />
        <label-filter
          :filter="filter"
        />
      </div>
      <div class="col-6 text-right">
        <pagination-compact
          :pagination="pagination"
          class="float-right"
        />
      </div>
    </div>

    <b-table
      :items="pipelinesProvider"
      :fields="fields"
      :per-page="pagination.size"
      :current-page="pagination.page"
      sort-icon-left
      no-provider-sorting
      striped
      hover
      borderless
      stacked="lg"
      ref="pipelines"
    >
      <template v-slot:head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="pipelines.length > 0 && pipelines.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < pipelines.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template v-slot:top-row>
        <b-td colspan="2" />
        <b-td>
          <b-form-select
            v-model="group"
            :options="mappedGroups"
            :disabled="!ready || selected.length === 0"
            @change="addGroup"
          />
        </b-td>
        <b-td>
          <b-form-select
            v-model="organization"
            :options="mappedOrganizations"
            :disabled="!ready || selected.length === 0"
            @change="addOrganization"
          />
        </b-td>
        <b-td colspan="2" />
      </template>

      <template v-slot:cell(checkbox)="data">
        <b-form-checkbox
          v-model="selected"
          :value="`${data.item.repoSource}/${data.item.repoOwner}/${data.item.repoName}`"
        />
      </template>
      <template v-slot:cell(groups)="data">
        <b-badge
          v-for="g in data.item.groups"
          :key="g.name"
          variant="warning"
          class="mr-1"
        >
          {{ g.name }}
        </b-badge>
      </template>
      <template v-slot:cell(labels)="data">
        <labels
          :labels="data.item.labels"
          route-name="AdminPipelines"
        />
      </template>
      <template v-slot:cell(organizations)="data">
        <b-badge
          v-for="org in data.item.organizations"
          :key="org.name"
          variant="success"
          class="mr-1"
        >
          {{ org.name }}
        </b-badge>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button
          size="sm"
          :to="{ name: 'AdminPipelineUpdate', params: { repoSource: row.item.repoSource, repoOwner: row.item.repoOwner, repoName: row.item.repoName } }"
          class="mr-1 mb-1"
        >
          Edit
        </b-button>
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="pipelines.length > 0"
    />
  </div>
</template>

<script>
import { BTable, BTd, BButton, BBadge, BFormCheckbox, BFormSelect } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import PipelineFilter from '@/components/PipelineFilter'
import Labels from '@/components/Labels'
import LabelFilter from '@/components/LabelFilter'

import debounce from 'lodash/debounce'

export default {
  components: {
    BTable,
    BTd,
    BButton,
    PaginationCompact,
    Pagination,
    BBadge,
    BFormCheckbox,
    BFormSelect,
    PipelineFilter,
    Labels,
    LabelFilter
  },

  data: function () {
    return {
      selected: [],
      group: null,
      groups: [],
      organization: null,
      organizations: [],
      pipelines: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        search: '',
        labels: ''
      },
      fields: [
        {
          key: 'checkbox',
          label: '',
          class: 'text-center'
        },
        {
          key: 'pipeline',
          sortable: true,
          formatter: (value, key, item) => {
            return `${item.repoSource}/${item.repoOwner}/${item.repoName}`
          }
        },
        {
          key: 'groups',
          sortable: true
        },
        {
          key: 'organizations',
          sortable: true
        },
        {
          key: 'labels',
          sortable: true
        },
        {
          key: 'actions'
        }
      ],
      loaded: {
        groups: false,
        organizations: false,
        pipelines: false
      }
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.loadGroups()
    this.loadOrganizations()
  },

  methods: {
    loadGroups () {
      this.axios.get(`/api/groups?page[number]=1&page[size]=100`)
        .then(response => {
          this.groups = response.data.items
          this.loaded.groups = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    loadOrganizations () {
      this.axios.get(`/api/organizations?page[number]=1&page[size]=100`)
        .then(response => {
          this.organizations = response.data.items
          this.loaded.organizations = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    pipelinesProvider (ctx) {
      var sort = ''
      if (ctx.sortBy) {
        sort += '&sort='
        if (ctx.sortDesc) {
          sort += '-'
        }
        sort += `${ctx.sortBy}`
      }
      var labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      return this.axios.get(`/api/admin/pipelines?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${sort}&filter[search]=${this.filter.search}${labelFilterParams}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.loaded.pipelines = true

          return this.pipelines || []
        })
    },

    setDataFromQueryParams (query) {
      this.filter.labels = query && query.labels ? query.labels : this.filterDefaults.labels
    },

    setSearch: debounce(
      function (value) {
        this.filter.search = value
        this.pagination.page = 1
        this.$refs.pipelines.refresh()
      },
      500
    ),

    toggleAll (checked) {
      this.selected = checked ? this.pipelines.map(p => `${p.repoSource}/${p.repoOwner}/${p.repoName}`) : []
    },

    addGroup () {
      var body = {
        pipelines: this.selected,
        group: this.groups.map(g => { return { id: g.id, name: g.name } }).find(g => g.name === this.group)
      }

      this.axios.post(`/api/admin/batch/pipelines`, body)
        .then(response => {
          this.group = null
          this.selected = []
          this.$refs.pipelines.refresh()
        })
        .catch(e => {
          this.group = null
          console.warn(e)
        })
    },

    addOrganization () {
      var body = {
        pipelines: this.selected,
        organization: this.organizations.map(o => { return { id: o.id, name: o.name } }).find(o => o.name === this.organization)
      }

      this.axios.post(`/api/admin/batch/pipelines`, body)
        .then(response => {
          this.organization = null
          this.selected = []
          this.$refs.pipelines.refresh()
        })
        .catch(e => {
          this.organization = null
          console.warn(e)
        })
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.$refs.pipelines.refresh()
    }
  },

  computed: {
    mappedGroups () {
      if (!this.groups) {
        return []
      }

      return [{ value: null, text: 'Add group' }].concat(this.groups.map(g => {
        return {
          value: `${g.name}`,
          text: `${g.name}`
        }
      }))
    },
    mappedOrganizations () {
      if (!this.organizations) {
        return []
      }

      return [{ value: null, text: 'Add organization' }].concat(this.organizations.map(o => {
        return {
          value: `${o.name}`,
          text: `${o.name}`
        }
      }))
    },
    ready () {
      for (const property in this.loaded) {
        if (!this.loaded[property]) {
          return false
        }
      }

      return true
    }
  }
}
</script>
