<template>
  <div>
    <div class="row">
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
      ref="organizations"
    >
      <template v-slot:head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="organizations.length > 0 && organizations.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < organizations.length"
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
          :to="{ name: 'AdminOrganizationUpdate', params: { id: row.item.id } }"
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox, BFormSelect } from 'bootstrap-vue'

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
    BBadge,
    BFormCheckbox,
    BFormSelect,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      selected: [],
      role: null,
      roles: [],
      organizations: [],
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
          key: 'actions'
        }
      ],
      loaded: {
        roles: false,
        organizations: false
      }
    }
  },

  created () {
    this.loadRoles()
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
    organizationsProvider (ctx) {
      return this.axios.get(`/api/organizations?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.organizations = response.data.items
          this.pagination = response.data.pagination

          this.loaded.organizations = true

          return this.organizations || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.organizations.map(o => o.id) : []
    },

    addRole () {
      var body = {
        organizations: this.selected,
        role: this.role
      }

      this.axios.post(`/api/admin/batch/organizations`, body)
        .then(response => {
          this.role = null
          this.selected = []
          this.$refs.organizations.refresh()
        })
        .catch(e => {
          this.role = null
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
