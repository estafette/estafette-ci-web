<template>
  <div>
    <b-jumbotron
      header="Create"
      bg-variant="warning"
      text-variant="dark"
      header-level="5"
      container-fluid
      fluid
      class="mb-3 p-3"
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
