<template>
  <div>
    <div class="row m-0">
      <div class="col-12 text-right">
        <pagination-compact
          :pagination="pagination"
          class="float-right"
        />
      </div>
    </div>

    <b-table
      :items="usersProvider"
      :fields="fields"
      :per-page="pagination.size"
      :current-page="pagination.page"
      sort-icon-left
      striped
      hover
      borderless
    >
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
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
          <b-row
            v-if="avatar(row.item)"
            class="mb-2"
          >
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Avatar:</b>
            </b-col>
            <b-col>
              <b-avatar
                :src="avatar(row.item)"
                class="mr-2"
              />
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <pagination
      :pagination="pagination"
      v-if="users.length > 0"
    />
  </div>
</template>

<script>
import { BTable, BButton, BCard, BRow, BCol, BAvatar } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BRow,
    BCol,
    BAvatar,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      users: [],
      pagination: {
        page: 1,
        size: 25,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'email',
          sortable: true
        },
        {
          key: 'roles',
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.join() : ''
          }
        },
        {
          key: 'firstVisit',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        },
        {
          key: 'lastVisit',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        },
        {
          key: 'show_details'
        }
      ]
    }
  },

  created () {
    this.loadUsers()
  },

  methods: {
    usersProvider (ctx) {
      var sort = ''
      if (ctx.sortBy) {
        sort = `&sort=${ctx.sortBy}`
      } else if (ctx.sortDesc) {
        sort = `&sort=-${ctx.sortDesc}`
      }

      return this.axios.get(`/api/users?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${sort}`)
        .then(response => {
          this.users = response.data.items
          this.pagination = response.data.pagination

          return this.users || []
        })
    },

    loadUsers () {
      this.axios.get(`/api/users`)
        .then(response => {
          this.users = response.data.items
          this.pagination = response.data.pagination
        })
        .catch(e => {
          console.warn(e)
        })
    },

    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    }
  },

  computed: {
    userCount () {
      return this.users ? this.users.length : 0
    },
    firstPageItem: function () {
      return 1 + (this.pagination.page - 1) * this.pagination.size
    },
    lastPageItem: function () {
      return this.pagination.page * this.pagination.size < this.pagination.totalItems ? this.pagination.page * this.pagination.size : this.pagination.totalItems
    }
  }
}
</script>
