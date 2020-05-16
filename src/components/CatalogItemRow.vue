<template>
  <router-link
    :to="{ name: 'CatalogItemOverview', params: { repoSource: catalogItem.repoSource, repoOwner: catalogItem.repoOwner, repoName: catalogItem.repoName }}"
    tag="div"
    class="row rounded border border-secondary align-items-center clickable pt-3 pr-2 pb-2 pl-2 bg-white"
  >
    <div
      class="col-6 mb-2 text-truncate"
      :title="catalogItem.repoName"
    >
      {{ catalogItem.repoName }}
    </div>
    <div
      class="col-6 mb-2 text-truncate"
      :title="catalogItem.repoSource + '/' + catalogItem.repoOwner + '/' + catalogItem.repoName"
    >
      <span :class="['text-muted d-none d-md-inline']">{{ catalogItem.repoSource }}/{{ catalogItem.repoOwner }}/</span><strong>{{ catalogItem.repoName }}</strong>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    catalogItem: {
      type: Object,
      default: null
    }
  }
}
</script>
