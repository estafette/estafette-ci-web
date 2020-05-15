<template>
  <div class="m-3">
    <div
      class="row mt-0 mr-0 mb-3 ml-0"
    >
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-3 p-0 text-right">
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
              v-model="form.filter"
              :options="filterOptions"
              @change="onChange"
            />
          </b-input-group>
        </b-form>
      </div>
    </div>

    <div class="row">
      <ul
        class="nav nav-tabs m-3"
      >
        <li
          v-for="filterValue in filterValues"
          :key="filterValue.value"
          class="nav-item"
        >
          <router-link
            :to="{ name: 'Catalog' }"
            class="nav-link"
          >
            {{ filterValue.value }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BForm, BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

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
      form: {
        filter: null
      },
      filters: [],
      filterOptions: [],
      filterValues: []
    }
  },

  created () {
    this.loadFilters()
  },

  methods: {
    loadFilters () {
      this.axios.get(`/api/catalog/filters`)
        .then(response => {
          this.filters = response.data

          var options = []
          this.filters.forEach(filter => {
            options.push({ value: filter, text: filter })
          })

          this.filterOptions = options

          if (this.filters && this.filters.length > 0) {
            this.form.filter = this.filters[0]
            this.loadFilterValues()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    loadFilterValues () {
      this.axios.get(`/api/catalog/filtervalues?filter[labels]=${this.form.filter}`)
        .then(response => {
          this.filterValues = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    onChange (value) {
      this.loadFilterValues()
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
