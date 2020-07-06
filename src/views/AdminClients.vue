<template>
  <div>
    <div class="row">
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
      stacked="lg"
      ref="clients"
    >
      <template v-slot:head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="clients.length > 0 && clients.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < clients.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template v-slot:top-row>
        <b-td colspan="2" />
        <b-td>
          <b-dropdown
            text="Update roles"
            variant="outline-info"
            :disabled="!ready || selected.length === 0"
          >
            <b-dropdown-form>
              <b-form-checkbox
                v-for="r in roles"
                :key="r"
                v-model="checkedRoles[r]"
                :value="'checked:'+r"
                :unchecked-value="'unchecked:'+r"
                :indeterminate="indeterminateRoles[r]"
                @change="toggleRole"
              >
                {{ r }}
              </b-form-checkbox>
              <b-button
                size="sm"
                variant="primary"
                @click="applyRoles"
                :disabled="rolesToAdd.length === 0 && rolesToRemove.length === 0"
              >
                Apply
              </b-button>
              <b-button
                size="sm"
                @click="updateRolesDropdown"
              >
                Reset
              </b-button>
            </b-dropdown-form>
          </b-dropdown>
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
          :to="{ name: 'AdminClientUpdate', params: { id: row.item.id } }"
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox, BDropdown, BDropdownForm } from 'bootstrap-vue'

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
    BDropdown,
    BDropdownForm,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      selected: [],
      checkedRoles: {},
      indeterminateRoles: {},
      rolesToAdd: [],
      rolesToRemove: [],
      roles: [],
      clients: [],
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
        clients: false
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
    clientsProvider (ctx) {
      return this.axios.get(`/api/clients?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.clients = response.data.items
          this.pagination = response.data.pagination

          this.loaded.clients = true

          return this.clients || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.clients.map(c => c.id) : []
    },

    updateRolesDropdown () {
      this.rolesToAdd = []
      this.rolesToRemove = []

      var selectedClients = this.clients.filter(c => this.selected.includes(c.id))

      this.checkedRoles = this.roles.reduce((map, r) => {
        var checked = selectedClients.length > 0 ? selectedClients.every(c => c.roles && c.roles.some(cr => cr === r)) : false
        map[r] = checked ? 'checked:' + r : 'unchecked:' + r
        return map
      }, {})

      this.indeterminateRoles = this.roles.reduce((map, r) => {
        map[r] = selectedClients.length > 0 && !selectedClients.every(c => c.roles && c.roles.some(cr => cr === r)) ? selectedClients.some(c => c.roles && c.roles.some(cr => cr === r)) : false
        return map
      }, {})
    },

    toggleRole (r) {
      var prefix = ''
      if (r.startsWith('checked:')) {
        prefix = 'checked:'
      } else if (r.startsWith('unchecked:')) {
        prefix = 'unchecked:'
      }
      var role = r.slice(prefix.length)

      // update indeterminate value (the .sync modifier doesn't seem to work)
      this.indeterminateRoles[r] = false

      if (prefix === 'checked:') {
        this.rolesToAdd.push(role)
        this.rolesToRemove = this.rolesToRemove.filter(ra => ra !== role)
      } else if (prefix === 'unchecked:') {
        this.rolesToRemove.push(role)
        this.rolesToAdd = this.rolesToAdd.filter(ra => ra !== role)
      }
    },

    applyRoles () {
      var body = {
        clients: this.selected,
        rolesToAdd: this.rolesToAdd,
        rolesToRemove: this.rolesToRemove
      }

      this.axios.post(`/api/admin/batch/clients`, body)
        .then(response => {
          this.selected = []
          this.$refs.clients.refresh()
        })
        .catch(e => {
          this.updateRolesDropdown()
          console.warn(e)
        })
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
  },

  watch: {
    selected () {
      this.updateRolesDropdown()
    }
  }
}
</script>
