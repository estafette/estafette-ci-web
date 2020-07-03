<template>
  <b-card-group deck>
    <b-card
      v-for="group in groups"
      :key="group.id"
      :title="group.name"
      tag="article"
    >
      <b-card-text>
        {{ group.description }}
      </b-card-text>

      <b-button
        :to="{ name: 'CatalogGroupDetails', params: { id: group.id } }"
        variant="primary"
      >
        Details
      </b-button>
    </b-card>
  </b-card-group>
</template>

<script>
import { BCardGroup, BCard, BCardText, BButton } from 'bootstrap-vue'

export default {
  components: {
    BCardGroup,
    BCard,
    BCardText,
    BButton
  },

  data: function () {
    return {
      groups: []
    }
  },

  created () {
    this.loadGroups()
  },

  methods: {
    loadGroups () {
      this.axios.get(`/api/catalog/groups`)
        .then(response => {
          this.groups = response.data.items
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
