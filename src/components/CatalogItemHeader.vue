<template>
  <div>
    <nav
      class="m-3"
      aria-label="breadcrumb"
    >
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate">
          <router-link :to="{ name: 'Catalog'}">
            Catalog
          </router-link>
        </li>
        <li
          class="breadcrumb-item text-truncate active"
          aria-current="page"
        >
          {{ repoName }}
        </li>
      </ol>
    </nav>

    <ul
      class="nav nav-tabs m-3"
    >
      <li class="nav-item">
        <router-link
          :to="{ name: 'CatalogItemOverview', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="industry"
            class="mr-2"
          />
          Overview
        </router-link>
      </li>
    </ul>

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
