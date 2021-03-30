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
      <template #head(checkbox)>
        <b-form-checkbox
          id="toggle-all"
          :checked="groups.length > 0 && groups.length === selected.length"
          :indeterminate="selected.length > 0 && selected.length < groups.length"
          :disabled="!ready"
          @change="toggleAll"
        />
      </template>

      <template #top-row>
        <b-td colspan="2" />
        <b-td>
          <batch-roles-dropdown
            :selected="selected"
            :selectable-items="groups"
            type="groups"
            :apply-done-func="applyDone"
          />
        </b-td>
        <b-td>
          <batch-organizations-dropdown
            :selected="selected"
            :selectable-items="groups"
            type="groups"
            :apply-done-func="applyDone"
          />
        </b-td>
        <b-td colspan="1" />
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
          :to="{ name: 'AdminGroupUpdate', params: { id: row.item.id } }"
          class="mr-1 mb-1"
        >
          Edit
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
import { BTable, BTd, BButton, BCard, BRow, BCol, BBadge, BFormCheckbox } from 'bootstrap-vue'

import BatchRolesDropdown from '@/components/BatchRolesDropdown'
import BatchOrganizationsDropdown from '@/components/BatchOrganizationsDropdown'
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
    BatchOrganizationsDropdown,
    PaginationCompact,
    Pagination,
    AdminGroupMembers,
    BatchRolesDropdown
  },

  data: function () {
    return {
      selected: [],
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
        groups: false
      }
    }
  },

  methods: {
    groupsProvider (ctx) {
      return this.axios.get(`/api/groups?page[number]=${ctx.currentPage}&page[size]=${ctx.perPage}`)
        .then(response => {
          this.groups = response.data.items
          this.pagination = response.data.pagination

          this.loaded.groups = true
          this.selected = []

          return this.groups || []
        })
    },

    toggleAll (checked) {
      this.selected = checked ? this.groups.map(g => g.id) : []
    },

    applyDone () {
      this.$refs.groups.refresh()
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
