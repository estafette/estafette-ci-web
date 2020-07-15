<template>
  <b-card
    title="Members"
    style="max-width: 30rem;"
  >
    <b-list-group flush>
      <b-list-group-item
        v-for="member in members"
        :key="member.id"
        class="d-flex align-items-center"
      >
        <b-avatar
          variant="info"
          :src="avatar(member)"
          :text="initials(member)"
          class="mr-3"
        />
        <span class="mr-auto">
          {{ member.name }}<br>
          <b-link
            :href="'mailto:' + member.email"
            target="_blank"
          >
            {{ member.email }}
          </b-link>
        </span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { BCard, BListGroup, BListGroupItem, BAvatar, BLink } from 'bootstrap-vue'
export default {
  components: {
    BCard,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink
  },

  props: {
    group: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      members: []
    }
  },

  created () {
    this.loadMembers()
  },

  methods: {
    loadMembers () {
      return this.axios.get(`/api/catalog/users?filter[group-id]=${this.group.id}&page[size]=100`)
        .then(response => {
          this.members = response.data.items
        })
        .catch(e => {
          console.warn(e)
        })
    },
    avatar (u) {
      return u.identities && u.identities.length > 0 && u.identities[0].avatar ? u.identities[0].avatar : undefined
    },
    initials (u) {
      return u.name.split(' ').map(n => n[0]).join('')
    }
  }
}
</script>
