<template>
  <div>
    <b-table
      striped
      hover
      borderless
      :items="users"
      :fields="fields"
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
  </div>
</template>

<script>
import { BTable, BButton, BCard, BRow, BCol, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BRow,
    BCol,
    BAvatar
  },

  data: function () {
    return {
      users: [],
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
    loadUsers () {
      this.axios.get(`/api/users`)
        .then(response => {
          this.users = response.data

          this.loaded = true
        })
        .catch(e => {
          console.warn(e)
        })
    },

    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    }
  }
}
</script>
