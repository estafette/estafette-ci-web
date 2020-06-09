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
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton
  },

  data: function () {
    return {
      form: {}
    }
  },

  methods: {
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
  }
}
</script>
