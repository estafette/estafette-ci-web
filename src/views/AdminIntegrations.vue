<template>
  <div>
    <div
      v-if="integrations.github"
      class="row mt-5 mb-5"
    >
      <div class="col">
        <h2 class="text-primary">
          Github
        </h2>

        <b-form
          action="https://github.com/settings/apps/new?state=abc123"
          method="post"
        >
          <b-form-input
            name="manifest"
            id="manifest"
            type="text"
            :value="githubAppManifest"
            class="d-none"
          />

          <b-button
            type="submit"
            variant="primary"
          >
            <font-awesome-icon
              :icon="['fab', 'github']"
            />
            Register Github App
          </b-button>
        </b-form>
      </div>
    </div>

    <div
      v-if="integrations.bitbucket"
      class="row mt-5 mb-5"
    >
      <div class="col">
        <h2 class="text-primary">
          Bitbucket
        </h2>

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
          :href="`https://bitbucket.org/site/addons/authorize?addon_key=${integrations.bitbucket.addonKey}&redirect_uri=${integrations.bitbucket.redirectURI}`"
        >
          <font-awesome-icon
            :icon="['fab', 'bitbucket']"
          />
          Connect to Bitbucket
        </b-button>
      </div>
    </div>

    <div
      v-if="!integrations.github"
      class="row mt-5 mb-5"
    >
      <div class="col">
        <h2 class="text-primary">
          Github
        </h2>

        <p>You haven't enabled Github integration. To do so set the following config:</p>

        <pre>
          <code>
          integrations:
            github:
              enable: true
          </code>
        </pre>

        <p>
          More detail can be found at <a
            href="https://estafette.io/getting-started/github/"
            target="_blank"
          >
            estafette.io</a>
        </p>
      </div>
    </div>

    <div
      v-if="!integrations.bitbucket"
      class="row mt-5 mb-5"
    >
      <div class="col">
        <h2 class="text-primary">
          Bitbucket
        </h2>

        <p>You haven't enabled Bitbucket integration. To do so set the following config:</p>

        <pre>
          <code>
          integrations:
            bitbucket:
              enable: true
          </code>
        </pre>

        <p>
          More detail can be found at <a
            href="https://estafette.io/getting-started/bitbucket/"
            target="_blank"
          >
            estafette.io</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { BForm, BFormInput, BButton } from 'bootstrap-vue'
import PropertyBlock from '@/components/PropertyBlock'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBitbucket, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBitbucket, faGithub)

export default {
  components: {
    BForm,
    BFormInput,
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
  },

  computed: {
    githubAppManifest () {
      if (!this.integrations || !this.integrations.github || !this.integrations.github.manifest) {
        return '{}'
      }

      return JSON.stringify(this.integrations.github.manifest)
    }
  }
}
</script>
