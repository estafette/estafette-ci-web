<template>
  <div>
    <div
      v-if="integrations.bitbucket"
    >
      <div class="row">
        <div class="col">
          <h2 class="text-primary">
            Bitbucket
          </h2>
        </div>
      </div>

      <div
        v-for="installation in integrations.bitbucket.installations"
        :key="installation.clientKey"
        class="row-block"
      >
        <property-block
          v-if="installation.workspace"
          label="Workspace"
          :value="installation.workspace.slug"
        />
        <property-block
          label="Key"
          :value="installation.key"
        />
        <property-block
          label="Client key"
          :value="installation.clientKey"
        />
      </div>

      <b-button
        variant="primary"
        :href="`https://bitbucket.org/site/addons/authorize?addon_key=${integrations.bitbucket.addonKey}&redirect_uri=${integrations.bitbucket.redirectUri}`"
      >
        <font-awesome-icon
          :icon="['fab', 'bitbucket']"
        />
        Connect to Bitbucket
      </b-button>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import PropertyBlock from '@/components/PropertyBlock'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBitbucket } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBitbucket)

export default {
  components: {
    BButton,
    PropertyBlock,
    FontAwesomeIcon
  },

  data: function () {
    return {
      integrations: {}
    }
  },

  created () {
    this.loadIntegrations()
  },

  methods: {
    loadIntegrations () {
      return this.axios.get('/api/admin/integrations')
        .then(response => {
          this.integrations = response.data
        })
    }
  }
}
</script>
