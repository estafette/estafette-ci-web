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
          <batch-roles-dropdown
            :selected="selected"
            :selectable-items="organizations"
            type="organizations"
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox } from 'bootstrap-vue'

import BatchRolesDropdown from '@/components/BatchRolesDropdown'
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
    PaginationCompact,
    Pagination
  },

  data: function () {
    return {
      selected: [],
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
        organizations: false
      }
    }
  },

  methods: {
    organizationsProvider (ctx) {
      return this.axios.get(`/api/organizations?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.organizations = response.data.items
          this.pagination = response.data.pagination

          this.loaded.organizations = true
          this.selected = []

          return this.organizations || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.organizations.map(o => o.id) : []
    },

    applyDone () {
      this.$refs.organizations.refresh()
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
