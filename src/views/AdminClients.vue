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
          <batch-roles-dropdown
            :selected="selected"
            :selectable-items="clients"
            type="clients"
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
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Organizations:</b>
            </b-col>
            <b-col>{{ row.item.organizations }}</b-col>
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox } from 'bootstrap-vue'

import BatchRolesDropdown from '@/components/BatchRolesDropdown'
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
    BBadge,
    BFormCheckbox,
    BatchRolesDropdown,
    BatchOrganizationsDropdown,
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      selected: [],
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
          key: 'organizations',
          sortable: true
        },
        {
          key: 'actions'
        }
      ],
      loaded: {
        clients: false
      }
    }
  },

  methods: {
    clientsProvider (ctx) {
      return this.axios.get(`/api/clients?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.clients = response.data.items
          this.pagination = response.data.pagination

          this.loaded.clients = true
          this.selected = []

          return this.clients || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.clients.map(c => c.id) : []
    },

    applyDone () {
      this.$refs.clients.refresh()
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
