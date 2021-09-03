<template>
  <div>
    <div class="rounded border bg-white p-3">
      <b-form
        @submit="onSubmit"
      >
        <h4>Update Bitbucket installations</h4>

        <b-form-group
          id="client-key-group"
          label="Client Key:"
          label-for="clientKey"
        >
          <b-form-input
            id="clientKey"
            v-model="form.clientKey"
            type="text"
            disabled
          />
        </b-form-group>

        <b-form-group
          v-if="form.workspace"
          id="workspace-group"
          label="Workspace:"
          label-for="workspace"
        >
          <b-form-input
            id="workspace"
            v-model="form.workspace.slug"
            type="text"
            disabled
          />
        </b-form-group>

        <b-form-group
          id="organizations-group"
          label="Organizations:"
          label-for="organizations"
        >
          <b-form-tags
            input-id="organizations"
            v-model="selectedOrganizations"
            add-on-change
            no-outer-focus
          >
            <template #default="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
              <ul
                v-if="tags.length > 0"
                class="list-inline d-inline-block mb-2"
              >
                <li
                  v-for="tag in tags"
                  :key="tag"
                  class="list-inline-item"
                >
                  <b-form-tag
                    @remove="removeTag(tag)"
                    :title="tag"
                    :disabled="disabled"
                    variant="success"
                  >
                    {{ tag }}
                  </b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                v-on="inputHandlers"
                :disabled="disabled || availableOrganizations.length === 0"
                :options="availableOrganizations"
              >
                <template #first>
                  <!-- This is required to prevent bugs with Safari -->
                  <option
                    disabled
                    value=""
                  >
                    Choose an organization...
                  </option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
          :disabled="!ready"
        >
          Update
        </b-button>
        <b-button
          variant="light"
          :to="{ name: 'AdminIntegrations' }"
        >
          Cancel
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BFormTags, BFormTag, BFormSelect, BButton } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormTags,
    BFormTag,
    BFormSelect,
    BButton
  },

  props: {
    clientKey: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      organizations: [],
      form: {
      },
      selectedOrganizations: [],
      loaded: {
        organizations: false,
        installation: false
      }
    }
  },

  created () {
    this.loadOrganizations()
    this.loadForm()
  },

  methods: {
    loadOrganizations () {
      this.axios.get('/api/organizations?page[number]=1&page[size]=100')
        .then(response => {
          this.organizations = response.data.items
          this.loaded.organizations = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    loadForm () {
      return this.axios.get('/api/admin/integrations')
        .then(response => {
          if (response.data && response.data.bitbucket && response.data.bitbucket.installations) {
            response.data.bitbucket.installations.forEach(installation => {
              if (installation && `${installation.clientKey}` === this.clientKey) {
                this.form = installation

                if (this.form && this.form.organizations) {
                  this.selectedOrganizations = this.form.organizations.map(o => o.name)
                }

                this.loaded.installation = true
              }
            })
          }
        })
        .catch(e => {
          console.warn(e)
        })
    },
    onSubmit (evt) {
      evt.preventDefault()

      if (this.selectedOrganizations.length > 0) {
        this.form.organizations = this.organizations.filter(org => this.selectedOrganizations.indexOf(org.name) !== -1).map(org => { return { id: org.id, name: org.name } })
      } else {
        this.form.organizations = []
      }

      this.axios.put('/api/admin/integrations/bitbucket/', this.form)
        .then(response => {
          this.$router.push({ name: 'AdminIntegrations' })
        })
        .catch(e => {
          console.warn(e)
        })
    }
  },

  computed: {
    pipelineName () {
      return this.form && this.form.repoSource && this.form.repoOwner && this.form.repoName ? this.form.repoSource + '/' + this.form.repoOwner + '/' + this.form.repoName : ''
    },
    availableRoles () {
      return this.roles.filter(role => !this.form || !this.form.roles || this.form.roles.indexOf(role) === -1)
    },
    availableGroups () {
      return this.groups.map(g => g.name).filter(group => !this.form || !this.selectedGroups || this.selectedGroups.indexOf(group) === -1)
    },
    availableOrganizations () {
      return this.organizations.map(o => o.name).filter(org => !this.form || !this.selectedOrganizations || this.selectedOrganizations.indexOf(org) === -1)
    },
    ready () {
      for (const property in this.loaded) {
        if (!this.loaded[property]) {
          return false
        }
      }

      return true
    }
  }
}
</script>
