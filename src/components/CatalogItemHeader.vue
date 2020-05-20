<template>
  <div class="header-block">
    <div class="property-block-title">
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
  </div>
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
