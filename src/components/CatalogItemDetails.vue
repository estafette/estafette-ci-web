<template>
  <div>
    <section-header section-route-name="Catalog" />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <catalog-item-header
      v-if="catalogItem"
      :catalog-item="catalogItem"
    />

    <inner-navigation-tabs />

    <router-view
      v-if="catalogItem"
      :catalog-item="catalogItem"
      class="m-3"
    />
  </div>
</template>

<script>
import { BBreadcrumb } from 'bootstrap-vue'
import CatalogItemHeader from '@/components/CatalogItemHeader'
import SectionHeader from '@/components/SectionHeader'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    BBreadcrumb,
    SectionHeader,
    CatalogItemHeader,
    InnerNavigationTabs
  },
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
      refresh: true,
      breadcrumbs: [
        {
          text: 'Catalog',
          to: { name: 'Catalog' }
        },
        {
          text: this.repoName,
          to: { name: 'CatalogItemOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } },
          active: true
        }
      ]
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
