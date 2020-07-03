<template>
  <b-row>
    <b-col
      v-for="group in groups"
      :key="group.id"
      cols="12"
      lg="4"
      class="mb-3 col-xxxl-3"
    >
      <b-card
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
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard, BCardText, BButton } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
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
