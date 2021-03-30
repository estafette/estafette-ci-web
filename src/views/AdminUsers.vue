<template>
  <div>
    <div class="row">
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
      ref="users"
    >
      <template #head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="users.length > 0 && users.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < users.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template #top-row>
        <b-td colspan="3" />
        <b-td>
          <batch-roles-dropdown
            :selected="selected"
            :selectable-items="users"
            type="users"
            :apply-done-func="applyDone"
          />
        </b-td>
        <b-td>
          <batch-groups-dropdown
            :selected="selected"
            :selectable-items="users"
            type="users"
            :apply-done-func="applyDone"
          />
        </b-td>
        <b-td>
          <batch-organizations-dropdown
            :selected="selected"
            :selectable-items="users"
            type="users"
            :apply-done-func="applyDone"
          />
        </b-td>
        <b-td colspan="3" />
      </template>

      <template #cell(checkbox)="data">
        <b-form-checkbox
          v-model="selected"
          :value="data.item.id"
        />
      </template>
      <template #cell(roles)="data">
        <b-badge
          v-for="r in data.item.roles"
          :key="r"
          variant="info"
          class="mr-1"
        >
          {{ r }}
        </b-badge>
      </template>
      <template #cell(groups)="data">
        <b-badge
          v-for="g in data.item.groups"
          :key="g.name"
          variant="warning"
          class="mr-1"
        >
          {{ g.name }}
        </b-badge>
      </template>
      <template #cell(organizations)="data">
        <b-badge
          v-for="org in data.item.organizations"
          :key="org.name"
          variant="success"
          class="mr-1"
        >
          {{ org.name }}
        </b-badge>
      </template>
      <template #cell(actions)="row">
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
        <b-button
          size="sm"
          variant="danger"
          :href="`/api/auth/impersonate/${row.item.id}`"
          class="mr-1 mb-1"
        >
          Impersonate
        </b-button>
      </template>
      <template #row-details="row">
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BAvatar, BBadge, BFormCheckbox } from 'bootstrap-vue'

import BatchRolesDropdown from '@/components/BatchRolesDropdown'
import BatchGroupsDropdown from '@/components/BatchGroupsDropdown'
import BatchOrganizationsDropdown from '@/components/BatchOrganizationsDropdown'
import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    BTable,
    BTd,
    BButton,
    BCard,
    BRow,
    BCol,
    BAvatar,
    PaginationCompact,
    Pagination,
    BBadge,
    BFormCheckbox,
    BatchRolesDropdown,
    BatchGroupsDropdown,
    BatchOrganizationsDropdown
  },

  data: function () {
    return {
      selected: [],
      users: [],
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'checkbox',
          label: '',
          class: 'text-center'
        },
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
          key: 'actions'
        }
      ],
      loaded: {
        users: false
      }
    }
  },

  methods: {
    usersProvider (ctx) {
      // wait for https://github.com/cockroachdb/cockroach/issues/35706 to be implemented for sorting jsonb fields

      const sort = ''
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

          this.loaded.users = true
          this.selected = []

          return this.users || []
        })
    },

    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    },

    toggleAll (checked) {
      this.selected = checked ? this.users.map(u => u.id) : []
    },

    applyDone () {
      this.$refs.users.refresh()
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
