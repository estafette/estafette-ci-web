<template>
  <div class="m-3">
    <div class="row rounded border border-secondary align-items-center clickable pt-3 pr-2 pb-2 pl-2 m-0">
      <div
        :class="[ 'col-6 col-xxxl-3', 'mb-2 text-truncate']"
        :title="catalogItem.repoSource + '/' + catalogItem.repoOwner + '/' + catalogItem.repoName"
      >
        <span :class="['text-muted d-none d-md-inline']">{{ catalogItem.repoSource }}/{{ catalogItem.repoOwner }}/</span><strong>{{ catalogItem.repoName }}</strong>
      </div>
    </div>

    <router-view
      :catalog-item="catalogItem"
      v-if="catalogItem"
    />
  </div>
</template>

<script>
export default {
  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      catalogItem: null,
      refresh: true
    }
  },

  created () {
    this.loadCatalogItem()
  },

  methods: {
    loadCatalogItem () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
        .then(response => {
          this.catalogItem = response.data
          this.periodicallyRefreshCatalogItem(5)
        })
        .catch(e => {
          this.periodicallyRefreshCatalogItem(30)
        })
    },

    periodicallyRefreshCatalogItem (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadCatalogItem, timeoutWithJitter)
      }
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
