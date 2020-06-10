<template>
  <div>
    <div class="row m-0">
      <div class="col-6">
        <b-button
          :to="{ name: 'AdminOrganizationCreate' }"
          variant="success"
        >
          Create organization
        </b-button>
      </div>
      <div class="col-6 text-right">
        <pagination-compact
          :pagination="pagination"
          class="float-right"
        />
      </div>
    </div>

    <router-view />

    <b-table
      :items="organizationsProvider"
      :fields="fields"
      :per-page="pagination.size"
      :current-page="pagination.page"
      sort-icon-left
      no-provider-sorting
      striped
      hover
      borderless
      stacked="lg"
    >
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-1"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button
          size="sm"
          :to="{ name: 'AdminOrganizationUpdate', params: { id: row.item.id } }"
          class="mr-1"
        >
          Edit
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>ID:</b>
            </b-col>
            <b-col>{{ row.item.id }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Identities:</b>
            </b-col>
            <b-col>{{ row.item.identities }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="organizations.length > 0"
    />
  </div>
</template>

<script>
import { BTable, BButton, BCard, BRow, BCol } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BRow,
    BCol,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      organizations: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'show_details'
        }
      ]
    }
  },

  methods: {
    organizationsProvider (ctx) {
      return this.axios.get(`/api/organizations?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.organizations = response.data.items
          this.pagination = response.data.pagination

          return this.organizations || []
        })
    }
  }
}
</script>
