<template>
  <div class="rounded border bg-white p-3">
    <b-form
      @submit="onSubmit"
    >
      <h4>Update organization</h4>
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
          placeholder="Enter name for the organization"
        />
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >
        Update
      </b-button>
      <b-button
        variant="danger"
        :to="{ name: 'AdminOrganizations' }"
      >
        Cancel
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
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
      form: {}
    }
  },

  created () {
    this.loadForm()
  },

  methods: {
    loadForm () {
      this.axios.get(`/api/organizations/${this.id}`, this.form)
        .then(response => {
          this.form = response.data
        })
        .catch(e => {
          console.warn(e)
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.axios.put(`/api/organizations/${this.id}`, this.form)
        .then(response => {
          this.$router.push({ name: 'AdminOrganizations' })
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
