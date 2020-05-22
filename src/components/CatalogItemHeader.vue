<template>
  <div class="header-block">
    <property-block
      label="Catalog"
      :value="catalogItem.repoName"
      title
    />
    <property-block
      label="Repository"
    >
      <repository-title :repo="catalogItem" />
    </property-block>
  </div>
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
