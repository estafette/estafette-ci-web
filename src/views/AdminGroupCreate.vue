<template>
  <div class="rounded border bg-white p-3">
    <b-form
      @submit="onSubmit"
    >
      <h4>Create new group</h4>
      <b-form-group
        id="name-group"
        label="Name:"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name for the group"
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
          <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
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
              <template v-slot:first>
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
      <b-button
        type="submit"
        variant="primary"
      >
        Create
      </b-button>
      <b-button
        variant="danger"
        :to="{ name: 'AdminGroups' }"
      >
        Cancel
      </b-button>
    </b-form>
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

  data: function () {
    return {
      roles: [],
      form: {
        name: '',
        roles: []
      }
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    loadRoles () {
      this.axios.get(`/api/roles`)
        .then(response => {
          this.roles = response.data
        })
        .catch(e => {
          console.warn(e)
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.axios.post(`/api/groups`, this.form)
        .then(response => {
          this.$router.push({ name: 'AdminGroups' })
        })
        .catch(e => {
          console.warn(e)
        })
    }
  },

  computed: {
    availableRoles () {
      return this.roles.filter(role => !this.form || !this.form.roles || this.form.roles.indexOf(role) === -1)
    }
  }
}
</script>
