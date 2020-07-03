<template>
  <div v-if="group">
    <b-card
      :title="group.name"
      tag="article"
    >
      <b-card-text>
        {{ group.description }}
      </b-card-text>
    </b-card>

    <b-card-group
      deck
      class="mt-2"
    >
      <group-members :group="group" />
      <group-pipelines
        :group="group"
        header="Pipelines"
        type="build"
      />
    </b-card-group>
  </div>
</template>

<script>
import { BCard, BCardText, BCardGroup } from 'bootstrap-vue'
import GroupMembers from '@/components/GroupMembers'
import GroupPipelines from '@/components/GroupPipelines'

export default {
  components: {
    BCard,
    BCardText,
    BCardGroup,
    GroupMembers,
    GroupPipelines
  },

  props: {
    id: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      group: null
    }
  },

  created () {
    this.loadGroup()
  },

  methods: {
    loadGroup () {
      this.axios.get(`/api/catalog/groups/${this.id}`)
        .then(response => {
          this.group = response.data
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
