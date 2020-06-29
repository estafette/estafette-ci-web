<template>
  <div>
    <div class="row">
      <div class="col-6">
        <pipeline-filter
          :model="filter.search"
          :on-input="setSearch"
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
      <template v-slot:cell(groups)="data">
        <b-badge
          v-for="group in data.item.groups"
          :key="group.name"
          variant="warning"
          class="mr-1"
        >
          {{ group.name }}
        </b-badge>
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
import { BTable, BButton, BBadge } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import PipelineFilter from '@/components/PipelineFilter'

import debounce from 'lodash/debounce'

export default {
  components: {
    BTable,
    BButton,
    PaginationCompact,
    Pagination,
    BBadge,
    PipelineFilter
  },

  data: function () {
    return {
      pipelines: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        search: ''
      },
      fields: [
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
          key: 'archived',
          sortable: true
        },
        {
          key: 'actions'
        }
      ]
    }
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

      return this.axios.get(`/api/admin/pipelines?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${sort}&filter[search]=${this.filter.search}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          return this.pipelines || []
        })
    },

    setSearch: debounce(
      function (value) {
        this.filter.search = value
        this.pagination.page = 1
        this.$refs.pipelines.refresh()
      },
      500
    )
  }
}
</script>
