<template>
  <div>
    <div class="row m-0">
      <div class="col-6">
        <b-button
          :to="{ name: 'AdminClientCreate' }"
          variant="success"
        >
          Create client
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
      :items="clientsProvider"
      :fields="fields"
      :per-page="pagination.size"
      :current-page="pagination.page"
      sort-icon-left
      no-provider-sorting
      striped
      hover
      borderless
      responsive
    >
      <template v-slot:cell(roles)="data">
        <b-badge
          v-for="role in data.item.roles"
          :key="role"
          variant="info"
        >
          {{ role }}
        </b-badge>
      </template>
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button
          size="sm"
          :to="{ name: 'AdminClientUpdate', params: { id: row.item.id } }"
          class="mr-2"
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
              <b>Active:</b>
            </b-col>
            <b-col>{{ row.item.active ? row.item.active : false }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Client ID:</b>
            </b-col>
            <b-col>{{ row.item.clientID }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Client secret:</b>
            </b-col>
            <b-col>{{ row.item.clientSecret }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="clients.length > 0"
    />
  </div>
</template>

<script>
import { BTable, BButton, BCard, BRow, BCol, BBadge } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BRow,
    BCol,
    BBadge,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      clients: [],
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
          key: 'roles',
          sortable: true
        },
        {
          key: 'show_details'
        }
      ]
    }
  },

  methods: {
    clientsProvider (ctx) {
      return this.axios.get(`/api/clients?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.clients = response.data.items
          this.pagination = response.data.pagination

          return this.clients || []
        })
    }
  }
}
</script>
