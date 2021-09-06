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

        <h4>Apps</h4>

        <div
          v-for="app in integrations.github.apps"
          :key="app.id"
          class="compact-block"
        >
          <property-block
            label="ID"
            :value="`${app.id}`"
          />
          <property-block
            label="Name"
            :value="app.name"
          />
          <property-block
            label="Slug"
            :value="app.slug"
          />
          <property-block
            label="Client ID"
            :value="app.client_id"
          />

          <property-block
            v-if="app.installations"
            label="Installations"
            wide
          >
            <div
              v-for="installation in app.installations"
              :key="installation.id"
              class="compact-block"
            >
              <property-block
                label="ID"
                :value="`${installation.id}`"
              />
              <property-block
                v-if="installation.account"
                label="Owner"
                :value="installation.account.login"
              />
              <property-block
                label="Organizations"
                wide
              >
                <b-badge
                  v-for="org in installation.organizations"
                  :key="org.name"
                  variant="success"
                  class="mr-1"
                >
                  {{ org.name }}
                </b-badge>
              </property-block>

              <property-block
                label="Actions"
                wide
              >
                <b-button
                  size="sm"
                  :to="{ name: 'AdminIntegrationsGithubUpdate', params: { id: `${installation.id}` } }"
                  class="mr-1 mb-1"
                >
                  Edit
                </b-button>
              </property-block>
            </div>
          </property-block>

          <property-block
            label="Actions"
            wide
          >
            <b-button
              variant="primary"
              :href="`https://github.com/apps/${app.name}/installations/new`"
              target="_blank"
            >
              <font-awesome-icon
                :icon="['fab', 'github']"
              />
              Install Github App
            </b-button>
          </property-block>
        </div>

        <h4>Register Github App</h4>

        <b-form-group
          id="organization-group"
          label="Organization:"
          label-for="organization"
        >
          <b-form-input
            id="organization"
            v-model="organization"
            type="text"
            placeholder="Enter organization name or leave empty for using a personal account"
          />
        </b-form-group>

        <b-form
          :action="githubAppFormAction"
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
            {{ githubRegisterAppButtonText }}
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

        <h4>Apps</h4>

        <div
          v-for="app in integrations.bitbucket.apps"
          :key="app.key"
          class="compact-block"
        >
          <property-block
            label="Key"
            :value="app.key"
          />

          <property-block
            v-if="app.installations"
            label="Installations"
            wide
          >
            <div
              v-for="installation in app.installations"
              :key="installation.clientKey"
              class="compact-block"
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

              <property-block
                label="Organizations"
                wide
              >
                <b-badge
                  v-for="org in installation.organizations"
                  :key="org.name"
                  variant="success"
                  class="mr-1"
                >
                  {{ org.name }}
                </b-badge>
              </property-block>

              <property-block
                label="Actions"
                wide
              >
                <b-button
                  size="sm"
                  :to="{ name: 'AdminIntegrationsBitbucketUpdate', params: { clientKey: `${installation.clientKey}` } }"
                  class="mr-1 mb-1"
                >
                  Edit
                </b-button>
              </property-block>
            </div>
          </property-block>

          <property-block
            label="Actions"
            wide
          >
            <b-button
              variant="primary"
              :href="`https://bitbucket.org/site/addons/authorize?addon_key=${app.key}&redirect_uri=${integrations.bitbucket.redirectURI}`"
            >
              <font-awesome-icon
                :icon="['fab', 'bitbucket']"
              />
              Install Bitbucket App
            </b-button>
          </property-block>
        </div>
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
import { BForm, BFormGroup, BFormInput, BButton, BBadge } from 'bootstrap-vue'
import PropertyBlock from '@/components/PropertyBlock'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBitbucket, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBitbucket, faGithub)

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BBadge,
    PropertyBlock,
    FontAwesomeIcon
  },

  data: function () {
    return {
      organization: '',
      integrations: {},
      refresh: true
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
          this.periodicallyRefreshIntegrations(15)
        })
        .catch(e => {
          this.periodicallyRefreshIntegrations(30)
        })
    },

    periodicallyRefreshIntegrations (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadIntegrations, timeoutWithJitter)
      }
    }
  },

  computed: {
    githubAppManifest () {
      if (!this.integrations || !this.integrations.github || !this.integrations.github.manifest) {
        return '{}'
      }

      return JSON.stringify(this.integrations.github.manifest)
    },

    githubAppFormAction () {
      if (!this.organization || this.organization === '') {
        return 'https://github.com/settings/apps/new'
      }

      return `https://github.com/organizations/${this.organization}/settings/apps/new`
    },

    githubRegisterAppButtonText () {
      if (!this.organization || this.organization === '') {
        return 'Register Github App for a personal account'
      }

      return `Register Github App for organization '${this.organization}'`
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
