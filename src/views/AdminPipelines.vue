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
          <batch-groups-dropdown
            :selected="selected"
            :selectable-items="pipelines"
            type="pipelines"
            :apply-done-func="applyDone"
            :selectable-id-func="s => `${s.repoSource}/${s.repoOwner}/${s.repoName}`"
          />
        </b-td>
        <b-td>
          <batch-organizations-dropdown
            :selected="selected"
            :selectable-items="pipelines"
            type="pipelines"
            :apply-done-func="applyDone"
            :selectable-id-func="s => `${s.repoSource}/${s.repoOwner}/${s.repoName}`"
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
      <template v-slot:cell(pipeline)="data">
        <span class="text-muted">{{ data.item.repoSource }}/{{ data.item.repoOwner }}/</span>{{ data.item.repoName }}
        <b-badge
          v-if="data.item.archived"
          variant="secondary"
        >
          Archived
        </b-badge>
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
import { BTable, BTd, BButton, BBadge, BFormCheckbox } from 'bootstrap-vue'

import BatchGroupsDropdown from '@/components/BatchGroupsDropdown'
import BatchOrganizationsDropdown from '@/components/BatchOrganizationsDropdown'
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
    BatchGroupsDropdown,
    BatchOrganizationsDropdown,
    PipelineFilter,
    Labels,
    LabelFilter
  },

  data: function () {
    return {
      selected: [],
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
        pipelines: false
      }
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.setDataFromQueryParams(this.query)
  },

  methods: {
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
        labelFilterParams = '&filter[labels]=' + this.filter.labels.split(',').join('&filter[labels]=')
      }
      var searchFilterParams = ''
      if (this.filter && this.filter.search && this.filter.search !== '') {
        searchFilterParams = `&filter[search]=${this.filter.search}`
      }

      return this.axios.get(`/api/admin/pipelines?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${sort}${labelFilterParams}${searchFilterParams}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.loaded.pipelines = true
          this.selected = []

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

    applyDone () {
      this.$refs.pipelines.refresh()
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.pagination.page = 1
      this.$refs.pipelines.refresh()
    }
  },

  computed: {
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
