<template>
  <div>
    <b-jumbotron
      header="Create"
      lead="Generate Estafette manifests and secrets"
      bg-variant="warning"
      text-variant="dark"
      header-level="5"
      class="mb-3 pl-3 pt-3 pr-3 pb-1"
    />

    <tabs :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import { BJumbotron } from 'bootstrap-vue'

export default {
  components: {
    Tabs,
    BJumbotron
  },
  data: function () {
    return {
      tabs: [
        {
          text: 'Generate',
          icon: 'hammer',
          enabled: true,
          to: { name: 'ManifestGenerator' }
        },
        {
          text: 'Secrets',
          icon: 'user-secret',
          enabled: true,
          to: { name: 'SecretEncrypter' }
        },
        {
          text: 'Validate',
          icon: 'clipboard-check',
          enabled: true,
          to: { name: 'ManifestValidator' }
        }
      ]
    }
  }
}
</script>
