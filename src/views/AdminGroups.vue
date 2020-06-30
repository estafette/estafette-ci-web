<template>
  <div>
    <div class="row">
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
      ref="groups"
    >
      <template v-slot:head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="groups.length > 0 && groups.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < groups.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template v-slot:top-row>
        <b-td colspan="2" />
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
            v-model="organization"
            :options="mappedOrganizations"
            :disabled="!ready || selected.length === 0"
            @change="addOrganization"
          />
        </b-td>
        <b-td colspan="1" />
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
          :to="{ name: 'AdminGroupUpdate', params: { id: row.item.id } }"
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox, BFormSelect } from 'bootstrap-vue'

import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'
import AdminGroupMembers from '@/components/AdminGroupMembers'

export default {
  components: {
    BTable,
    BTd,
    BButton,
    BCard,
    BRow,
    BCol,
    BBadge,
    BFormCheckbox,
    BFormSelect,
    PaginationCompact,
    Pagination,
    AdminGroupMembers
  },

  data: function () {
    return {
      selected: [],
      organization: null,
      organizations: [],
      role: null,
      roles: [],
      groups: [],
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
          key: 'roles',
          sortable: true
        },
        {
          key: 'organizations',
          sortable: true
        },
        {
          key: 'actions'
        }
      ],
      loaded: {
        roles: false,
        organizations: false,
        groups: false
      }
    }
  },

  created () {
    this.loadRoles()
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
    groupsProvider (ctx) {
      return this.axios.get(`/api/groups?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.groups = response.data.items
          this.pagination = response.data.pagination

          this.loaded.groups = true

          return this.groups || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.groups.map(g => g.id) : []
    },

    addRole () {
      var body = {
        groups: this.selected,
        role: this.role
      }

      this.axios.post(`/api/admin/batch/groups`, body)
        .then(response => {
          this.role = null
          this.selected = []
          this.$refs.groups.refresh()
        })
        .catch(e => {
          this.role = null
          console.warn(e)
        })
    },

    addOrganization () {
      var body = {
        groups: this.selected,
        organization: this.organizations.map(o => { return { id: o.id, name: o.name } }).find(o => o.name === this.organization)
      }

      this.axios.post(`/api/admin/batch/groups`, body)
        .then(response => {
          this.organization = null
          this.selected = []
          this.$refs.groups.refresh()
        })
        .catch(e => {
          this.organization = null
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
