<template>
  <router-link
    :to="{ name: 'CatalogItemOverview', params: { repoSource: catalogItem.repoSource, repoOwner: catalogItem.repoOwner, repoName: catalogItem.repoName }}"
    tag="div"
    class="row-block"
  >
    <property-block
      label="Catalog"
      :value="catalogItem.repoName"
    />
    <property-block
      label="Repository"
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
