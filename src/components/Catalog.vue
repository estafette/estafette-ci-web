<template>
  <div class="m-3">
    <div
      class="row m-0"
    >
      <div class="col-12 col-sm-6 col-lg-3 col-xxl-2 p-0">
        <b-form
          autocomplete="off"
        >
          <b-input-group class="mb-3">
            <b-input-group-prepend
              is-text
              class="icon-container"
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
      <div class="col-12 col-sm-6 col-lg-9 col-xxl-10 p-0 text-right">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <div class="row">
      <tabs :tabs="tabs" />
    </div>

    <div class="mb-3">
      <div
        class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold bg-white"
      >
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
          class="mt-2 mb-2 ml-0 mr-0 list-complete-item"
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
        var filterKeyValue = this.query.filter.split('=')
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
      var query = { ...this.$route.query }
      var newQueryFilter = `${this.activeFilter}=${this.activeFilterValue}`
      var newQueryPage = this.pagination.page

      if (query.filter !== newQueryFilter || query.page !== newQueryPage) {
        query.filter = newQueryFilter
        query.page = newQueryPage

        this.$router.push({ query: query })
      }
    },

    loadFilters () {
      this.axios.get(`/api/catalog/filters`)
        .then(response => {
          this.filters = response.data

          var options = []
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
          console.log(e)
          this.periodicallyRefreshFilters(60)
        })
    },

    periodicallyRefreshFilters (intervalSeconds) {
      if (this.refreshFiltersTimeout) {
        clearTimeout(this.refreshFiltersTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
          console.log(e)
        })
    },

    loadCatalogItems () {
      this.axios.get(`/api/pipelines?filter[labels]=${this.activeFilter}=${this.activeFilterValue}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.catalogItems = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    onChange (value) {
      delete this.activeFilterValue
      this.loadFilterValues()
    },

    paginationLinkGenerator (pageNum) {
      var query = { ...this.$route.query }

      if (pageNum > 1) {
        query.page = pageNum
      } else if (query.page) {
        delete query.page
      }

      return { query: query }
    },

    queryGenerator (newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
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
          to: { name: 'Catalog', query: this.queryGenerator({ 'filter': `${this.activeFilter}=${f.value}` }) }
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
