<template>
  <router-link
    :to="{ name: 'CatalogItemOverview', params: { repoSource: catalogItem.repoSource, repoOwner: catalogItem.repoOwner, repoName: catalogItem.repoName }}"
    tag="div"
    class="row-block list-complete-item"
  >
    <property-block
      label="Catalog"
      :value="catalogItem.repoName"
      class="col-xxxl-6"
    />
    <property-block
      label="Repository"
      class="col-xxxl-6"
    >
      <repository-title :repo="catalogItem" />
    </property-block>
  </router-link>
</template>

<script>
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'

export default {
  components: {
    PropertyBlock,
    RepositoryTitle
  },

  props: {
    catalogItem: {
      type: Object,
      default: null
    }
  }
}
</script>
