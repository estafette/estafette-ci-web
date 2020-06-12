<template>
  <ul>
    <li
      v-for="member in members"
      :key="member.id"
    >
      {{ member.name }}
    </li>
  </ul>
</template>

<script>
export default {

  props: {
    id: {
      type: String,
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
      return this.axios.get(`/api/users?filter[group-id]=${this.id}&page[size]=100`)
        .then(response => {
          this.members = response.data.items
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
