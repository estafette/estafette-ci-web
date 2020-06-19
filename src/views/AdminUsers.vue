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
      no-provider-sorting
      striped
      hover
      borderless
      stacked="lg"
    >
      <template v-slot:cell(roles)="data">
        <b-badge
          v-for="role in data.item.roles"
          :key="role"
          variant="info"
          class="mr-1"
        >
          {{ role }}
        </b-badge>
      </template>
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
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-1 mb-1"
        >
          {{ row.detailsShowing ? 'Hide' : 'Details' }}
        </b-button>
        <b-button
          size="sm"
          :to="{ name: 'AdminUserUpdate', params: { id: row.item.id } }"
          class="mr-1 mb-1"
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
              <b>Identities:</b>
            </b-col>
            <b-col>{{ row.item.identities }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Organizations:</b>
            </b-col>
            <b-col>{{ row.item.organizations }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Groups:</b>
            </b-col>
            <b-col>{{ row.item.groups }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Preferences:</b>
            </b-col>
            <b-col>{{ row.item.preferences }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Current provider:</b>
            </b-col>
            <b-col>{{ row.item.currentProvider }}</b-col>
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
import { BTable, BButton, BCard, BRow, BCol, BAvatar, BBadge } from 'bootstrap-vue'

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
    Pagination,
    BBadge
  },

  data: function () {
    return {
      users: [],
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
          key: 'email',
          sortable: true
        },
        {
          key: 'roles',
          sortable: true
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

  methods: {
    usersProvider (ctx) {
      // wait for https://github.com/cockroachdb/cockroach/issues/35706 to be implemented for sorting jsonb fields

      var sort = ''
      // if (ctx.sortBy) {
      //   sort += '&sort='
      //   if (ctx.sortDesc) {
      //     sort += '-'
      //   }
      //   sort += `${ctx.sortBy}`
      // }

      return this.axios.get(`/api/users?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}${sort}`)
        .then(response => {
          this.users = response.data.items
          this.pagination = response.data.pagination

          return this.users || []
        })
    },

    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    }
  }
}
</script>
