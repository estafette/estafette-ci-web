<template>
  <div>
    <div class="rounded border bg-white p-3">
      <b-form
        @submit="onSubmit"
      >
        <h4>Update user</h4>
        <b-form-group
          id="name-user"
          label="Name:"
          label-for="name"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter name for the user"
          />
        </b-form-group>
        <b-form-group
          id="roles-group"
          label="Roles:"
          label-for="roles"
        >
          <b-form-tags
            input-id="roles"
            v-model="form.roles"
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
                    variant="info"
                  >
                    {{ tag }}
                  </b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                v-on="inputHandlers"
                :disabled="disabled || availableRoles.length === 0"
                :options="availableRoles"
              >
                <template #first>
                  <!-- This is required to prevent bugs with Safari -->
                  <option
                    disabled
                    value=""
                  >
                    Choose a role...
                  </option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>
        </b-form-group>
        <b-form-group
          id="groups-group"
          label="Groups:"
          label-for="groups"
        >
          <b-form-tags
            input-id="groups"
            v-model="selectedGroups"
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
                    variant="warning"
                  >
                    {{ tag }}
                  </b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                v-on="inputHandlers"
                :disabled="disabled || availableGroups.length === 0"
                :options="availableGroups"
              >
                <template #first>
                  <!-- This is required to prevent bugs with Safari -->
                  <option
                    disabled
                    value=""
                  >
                    Choose a group...
                  </option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>
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
          :to="{ name: 'AdminUsers' }"
        >
          Cancel
        </b-button>
      </b-form>
    </div>
    <div class="rounded border border-danger bg-white p-3 mt-3">
      <div class="d-flex justify-content-between">
        <div>
          <h6>Delete this user</h6>
          <p class="align-self-end">
            Once you delete an user, there is no going back. Please be certain.
          </p>
        </div>
        <div class="align-self-center">
          <b-button
            variant="danger"
            @click="onDelete"
          >
            Delete this user
          </b-button>
        </div>
      </div>
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
    id: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      roles: [],
      organizations: [],
      groups: [],
      form: {
        name: '',
        roles: []
      },
      selectedGroups: [],
      selectedOrganizations: [],
      loaded: {
        roles: false,
        organizations: false,
        groups: false,
        user: false
      }
    }
  },

  created () {
    this.loadRoles()
    this.loadGroups()
    this.loadOrganizations()
    this.loadForm()
  },

  methods: {
    loadRoles () {
      this.axios.get('/api/roles')
        .then(response => {
          this.roles = response.data
          this.loaded.roles = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    loadGroups () {
      this.axios.get('/api/groups?page[number]=1&page[size]=100')
        .then(response => {
          this.groups = response.data.items
          this.loaded.groups = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
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
      this.axios.get(`/api/users/${this.id}`)
        .then(response => {
          this.form = response.data
          if (this.form && this.form.groups) {
            this.selectedGroups = this.form.groups.map(g => g.name)
          }
          if (this.form && this.form.organizations) {
            this.selectedOrganizations = this.form.organizations.map(o => o.name)
          }
          this.loaded.user = true
        })
        .catch(e => {
          console.warn(e)
        })
    },
    onSubmit (evt) {
      evt.preventDefault()

      if (this.selectedGroups.length > 0) {
        this.form.groups = this.groups.filter(group => this.selectedGroups.indexOf(group.name) !== -1).map(group => { return { id: group.id, name: group.name } })
      } else {
        this.form.groups = []
      }

      if (this.selectedOrganizations.length > 0) {
        this.form.organizations = this.organizations.filter(org => this.selectedOrganizations.indexOf(org.name) !== -1).map(org => { return { id: org.id, name: org.name } })
      } else {
        this.form.organizations = []
      }

      this.axios.put(`/api/users/${this.id}`, this.form)
        .then(response => {
          this.$router.push({ name: 'AdminUsers' })
        })
        .catch(e => {
          console.warn(e)
        })
    },

    onDelete (evt) {
      evt.preventDefault()
      this.axios.delete(`/api/users/${this.id}`)
        .then(response => {
          this.$router.push({ name: 'AdminUsers' })
        })
        .catch(e => {
          console.warn(e)
        })
    }
  },

  computed: {
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
