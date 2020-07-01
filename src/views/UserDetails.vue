<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-xl-4 col-xxl-3">
        <b-table
          v-if="user"
          :items="[user]"
          :fields="fields"
          sort-icon-left
          no-provider-sorting
          borderless
          stacked
        >
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
          <template v-slot:cell(actions)>
            <b-button
              href="/api/auth/logout/"
              variant="danger"
            >
              Log out
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BTable, BButton, BBadge } from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
    BBadge
  },

  data: function () {
    return {
      refresh: true,
      fields: [
        {
          key: 'name'
        },
        {
          key: 'email'
        },
        {
          key: 'roles'
        },
        {
          key: 'groups'
        },
        {
          key: 'organizations'
        },
        {
          key: 'firstVisit',
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        },
        {
          key: 'lastVisit',
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        },
        {
          key: 'actions'
        }
      ]
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    avatar () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.avatar)
        if (identity && identity.avatar) {
          return identity.avatar
        }
      }

      return ''
    },

    name () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.name)
        if (identity && identity.name) {
          return identity.name
        }
      }

      return ''
    },

    email () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.email)
        if (identity && identity.email) {
          return identity.email
        }
      }

      return ''
    }
  }
}
</script>
