<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-3 col-xxl-2">
        <b-form
          autocomplete="off"
        >
          <b-input-group class="mb-3">
            <b-input-group-prepend
              is-text
            >
              <font-awesome-icon icon="tags" />
            </b-input-group-prepend>
            <b-form-select
              v-if="filterOptions.length > 0"
              :id="`filter-select`"
              v-model="activeFilter"
              :options="filters"
              @change="onChange"
            />
          </b-input-group>
        </b-form>
      </div>
      <div class="col-12 col-sm-6 col-lg-9 col-xxl-10 text-right">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <tabs
      :tabs="tabs"
      :active-tab-text="`${activeFilterValue} (${pagination.totalItems})`"
    />

    <div class="row-header">
      <div class="col-6">
        Name
      </div>
      <div class="col-6">
        Repository
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="catalogItems.length > 0"
    >
      <catalog-item-row
        v-for="catalogItem in catalogItems"
        :key="catalogItem.repoSource+'/'+catalogItem.repoOwner+'/'+catalogItem.repoName"
        :catalog-item="catalogItem"
        :row-item="true"
      />
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5"
    >
      There are no items for the current filter value.
    </div>
    <div v-else>
      <spinner color="primary" />
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="catalogItems.length > 0"
    />
  </div>
</template>

<script>
import { BForm, BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'
import Spinner from '@/components/Spinner'
import CatalogItemRow from '@/components/CatalogItemRow'
import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTags)

export default {
  components: {
    BForm,
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    Spinner,
    CatalogItemRow,
    PaginationCompact,
    Pagination,
    Tabs,
    FontAwesomeIcon
  },

  mixins: [queryGenerator],

  props: {
    query: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      filters: [],
      filterOptions: [],
      activeFilter: null,
      filterValues: [],
      activeFilterValue: null,
      catalogItems: [],
      pagination: {
        page: 1,
        size: 25,
        totalPages: 0,
        totalItems: 0
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.setDataFromQueryParams()
    this.loadFilters()
  },

  methods: {
    setDataFromQueryParams () {
      // init activeFilter, activeFilterValue and pagination from query params if present
      if (this.query.filter) {
        // split filter on =
        const filterKeyValue = this.query.filter.split('=')
        if (filterKeyValue.length > 0) {
          this.activeFilter = filterKeyValue[0]
        }
        if (filterKeyValue.length > 1) {
          this.activeFilterValue = filterKeyValue[1]
        }
      }
      if (this.query.page) {
        this.pagination.page = this.query.page
      }
    },

    setQueryParams () {
      const query = { ...this.$route.query }
      const newQueryFilter = `${this.activeFilter}=${this.activeFilterValue}`
      const newQueryPage = this.pagination.page

      if (query.filter !== newQueryFilter || query.page !== newQueryPage) {
        query.filter = newQueryFilter
        query.page = newQueryPage

        this.$router.push({ query: query })
      }
    },

    loadFilters () {
      this.axios.get('/api/catalog/filters')
        .then(response => {
          this.filters = response.data

          const options = []
          this.filters.forEach(filter => {
            options.push({ value: filter, text: filter })
          })
          this.filterOptions = options

          // set activeFilter to first filter if not set or filter no longer exists
          if (this.filters && this.filters.length > 0 && (!this.activeFilter || !this.filters.some(f => f === this.activeFilter))) {
            this.activeFilter = this.filters[0]
          }
          this.loadFilterValues()

          this.periodicallyRefreshFilters(10)
        })
        .catch(e => {
          console.warn(e)
          this.periodicallyRefreshFilters(60)
        })
    },

    periodicallyRefreshFilters (intervalSeconds) {
      if (this.refreshFiltersTimeout) {
        clearTimeout(this.refreshFiltersTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshFiltersTimeout = setTimeout(this.loadFilters, timeoutWithJitter)
      }
    },

    loadFilterValues () {
      this.axios.get(`/api/catalog/filtervalues?filter[labels]=${this.activeFilter}`)
        .then(response => {
          this.filterValues = response.data

          // set activeFilterValue to first filter value if not set or filter value no longer exists
          if (this.filterValues && this.filterValues.length > 0 && (!this.activeFilterValue || !this.filterValues.some(f => f.value === this.activeFilterValue))) {
            this.activeFilterValue = this.filterValues[0].value
            this.setQueryParams()
          }
          this.loadCatalogItems()
        })
        .catch(e => {
          console.warn(e)
        })
    },

    loadCatalogItems () {
      this.axios.get(`/api/pipelines?filter[labels]=${this.activeFilter}=${this.activeFilterValue}&filter[since]=eternity&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.catalogItems = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          console.warn(e)
        })
    },

    onChange (value) {
      delete this.activeFilterValue
      this.loadFilterValues()
    },

    paginationLinkGenerator (pageNum) {
      const query = { ...this.$route.query }

      if (pageNum > 0) {
        query.page = pageNum
      } else if (query.page) {
        delete query.page
      }

      return { query: query }
    }
  },

  computed: {
    tabs () {
      if (!this.filterValues) {
        return []
      }

      return this.filterValues.map(f => {
        return {
          text: `${f.value} (${f.pipelinescount})`,
          enabled: true,
          exact: true,
          to: { name: 'CatalogServices', query: this.queryGenerator({ filter: `${this.activeFilter}=${f.value}` }) }
        }
      })
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams()
      this.loadCatalogItems()
    }
  },

  beforeDestroy () {
    this.refresh = false

    if (this.refreshFiltersTimeout) {
      clearTimeout(this.refreshFiltersTimeout)
    }
  }
}
</script>
