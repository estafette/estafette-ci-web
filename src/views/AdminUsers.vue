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
      <template v-slot:head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="users.length > 0 && users.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < users.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template v-slot:top-row>
        <b-td colspan="3" />
        <b-td>
          <b-form-select
            v-model="role"
            :options="mappedRoles"
            :disabled="!ready || selected.length === 0"
            @change="addRole"
          />
        </b-td>
        <b-td>
          <b-form-select
            v-model="group"
            :options="mappedGroups"
            :disabled="!ready || selected.length === 0"
            @change="addGroup"
          />
        </b-td>
        <b-td>
          <b-form-select
            v-model="organization"
            :options="mappedOrganizations"
            :disabled="!ready || selected.length === 0"
            @change="addOrganization"
          />
        </b-td>
        <b-td colspan="3" />
      </template>

      <template v-slot:cell(checkbox)="data">
        <b-form-checkbox
          v-model="selected"
          :value="data.item.id"
        />
      </template>
      <template v-slot:cell(roles)="data">
        <b-badge
          v-for="r in data.item.roles"
          :key="r"
          variant="info"
          class="mr-1"
        >
          {{ r }}
        </b-badge>
      </template>
      <template v-slot:cell(groups)="data">
        <b-badge
          v-for="g in data.item.groups"
          :key="g.name"
          variant="warning"
          class="mr-1"
        >
          {{ g.name }}
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BAvatar, BBadge, BFormCheckbox, BFormSelect } from 'bootstrap-vue'

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
    BFormSelect
  },

  data: function () {
    return {
      selected: [],
      group: null,
      groups: [],
      organization: null,
      organizations: [],
      role: null,
      roles: [],
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
        roles: false,
        groups: false,
        organizations: false,
        users: false
      }
    }
  },

  created () {
    this.loadRoles()
    this.loadGroups()
    this.loadOrganizations()
  },

  methods: {
    loadRoles () {
      this.axios.get(`/api/roles`)
        .then(response => {
          this.roles = response.data
          this.loaded.roles = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    loadGroups () {
      this.axios.get(`/api/groups?page[number]=1&page[size]=100`)
        .then(response => {
          this.groups = response.data.items
          this.loaded.groups = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    loadOrganizations () {
      this.axios.get(`/api/organizations?page[number]=1&page[size]=100`)
        .then(response => {
          this.organizations = response.data.items
          this.loaded.organizations = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
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

          this.loaded.users = true

          return this.users || []
        })
    },

    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    },

    toggleAll (checked) {
      this.selected = checked ? this.users.map(u => u.id) : []
    },

    addRole () {
      var body = {
        users: this.selected,
        role: this.role
      }

      this.axios.post(`/api/admin/batch/users`, body)
        .then(response => {
          this.role = null
          this.selected = []
          this.$refs.users.refresh()
        })
        .catch(e => {
          console.warn(e)
        })
    },

    addGroup () {
      var body = {
        users: this.selected,
        group: this.groups.filter(g => g.name === this.group).map(g => { return { id: g.id, name: g.name } })
      }

      this.axios.post(`/api/admin/batch/users`, body)
        .then(response => {
          this.group = null
          this.selected = []
          this.$refs.users.refresh()
        })
        .catch(e => {
          console.warn(e)
        })
    },

    addOrganization () {
      var body = {
        users: this.selected,
        organization: this.organizations.filter(o => o.name === this.organization).map(o => { return { id: o.id, name: o.name } })
      }

      this.axios.post(`/api/admin/batch/users`, body)
        .then(response => {
          this.organization = null
          this.selected = []
          this.$refs.users.refresh()
        })
        .catch(e => {
          console.warn(e)
        })
    }
  },

  computed: {
    mappedRoles () {
      if (!this.roles) {
        return []
      }

      return [{ value: null, text: 'Add role' }].concat(this.roles.map(r => {
        return {
          value: `${r}`,
          text: `${r}`
        }
      }))
    },
    mappedGroups () {
      if (!this.groups) {
        return []
      }

      return [{ value: null, text: 'Add group' }].concat(this.groups.map(g => {
        return {
          value: `${g.name}`,
          text: `${g.name}`
        }
      }))
    },
    mappedOrganizations () {
      if (!this.organizations) {
        return []
      }

      return [{ value: null, text: 'Add organization' }].concat(this.organizations.map(o => {
        return {
          value: `${o.name}`,
          text: `${o.name}`
        }
      }))
    },
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
