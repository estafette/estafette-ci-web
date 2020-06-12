<template>
  <div>
    <div class="row m-0">
      <div class="col-6">
        <b-button
          :to="{ name: 'AdminGroupCreate' }"
          variant="success"
        >
          Create group
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
      :items="groupsProvider"
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
          :to="{ name: 'AdminGroupUpdate', params: { id: row.item.id } }"
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
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Members:</b>
            </b-col>
            <b-col>
              <admin-group-members :id="row.item.id" />
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="groups.length > 0"
    />
  </div>
</template>

<script>
import { BTable, BButton, BCard, BRow, BCol } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import AdminGroupMembers from '@/components/AdminGroupMembers'

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BRow,
    BCol,
    PaginationCompact,
    Pagination,
    AdminGroupMembers
  },

  data: function () {
    return {
      groups: [],
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
    groupsProvider (ctx) {
      return this.axios.get(`/api/groups?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.groups = response.data.items
          this.pagination = response.data.pagination

          return this.groups || []
        })
    }
  }
}
</script>
