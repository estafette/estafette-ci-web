<template>
  <div>
    <section-header section-route-name="Catalog" />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <div
      v-if="group"
      class="mr-3 ml-3"
    >
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
  </div>
</template>

<script>
import { BCard, BCardText, BCardGroup, BBreadcrumb } from 'bootstrap-vue'
import SectionHeader from '@/components/SectionHeader'
import GroupMembers from '@/components/GroupMembers'
import GroupPipelines from '@/components/GroupPipelines'

export default {
  components: {
    BCard,
    BCardText,
    BCardGroup,
    BBreadcrumb,
    SectionHeader,
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
      group: null,
      breadcrumbs: [
        {
          text: 'Catalog',
          to: { name: 'Catalog' }
        }
      ]
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

          this.breadcrumbs.push({
            text: this.group.name,
            to: { name: 'CatalogGroupDetails', params: { id: this.id } },
            active: true
          })
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
