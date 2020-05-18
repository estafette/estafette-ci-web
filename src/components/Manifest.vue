<template>
  <div>
    <tabs :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'

export default {
  components: {
    Tabs
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
