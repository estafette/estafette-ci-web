<template>
  <router-link
    :to="{ name: 'CatalogItemOverview', params: { repoSource: catalogItem.repoSource, repoOwner: catalogItem.repoOwner, repoName: catalogItem.repoName }}"
    tag="div"
    class="row-block"
  >
    <div class="property-block">
      <property-label text="Catalog item" />
      <property-value>
        {{ catalogItem.repoName }}
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Repository" />
      <property-value>
        <repository-title :repo="catalogItem" />
      </property-value>
    </div>
  </router-link>
</template>

<script>
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'
import RepositoryTitle from '@/components/RepositoryTitle'

export default {
  components: {
    PropertyLabel,
    PropertyValue,
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
