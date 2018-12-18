<template>
    <div class="m-3 p-3">
      <b-form @submit="onSubmit" autocomplete="off">
        <label for="template">Template</label>
        <b-form-textarea id="template" v-model="form.template"
                        placeholder="Paste your manifest"
                        :rows="25" class="border bg-light" :class="status | bootstrapClass('border')"></b-form-textarea>

        <b-button type="submit" variant="primary" class="mt-3">Validate</b-button>
      </b-form>

      <div v-if="validating">
        <spinner color="secondary"/>
      </div>

      <div v-if="status == 'succeeded'" class="mt-4">
        <h5 class="text-success">Your manifest is valid!</h5>
        <p>Store the manifest in file <code>.estafette.yaml</code> in the root of your application repository.</p>
      </div>

      <div v-if="status == 'failed'" class="mt-4">
        <h5 class="text-danger">Validation errors</h5>
        <p>Please address the following errors and validate again!</p>
        <pre class="bg-light border-danger p-3"><code>{{errors}}</code></pre>
      </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import bForm from 'bootstrap-vue/es/components/form/form'
import bFormTextarea from 'bootstrap-vue/es/components//form-textarea/form-textarea'
import bButton from 'bootstrap-vue/es/components/button/button'

export default {
  components: {
    Spinner,
    bForm,
    bFormTextarea,
    bButton
  },
  data: function () {
    return {
      form: {
        template: null
      },
      validating: false,
      status: 'secondary',
      errors: null
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.validating = true

      this.axios.post(`/api/manifest/validate`, this.form)
        .then(response => {
          this.validating = false
          this.status = response.data.status
          this.errors = response.data.errors
          window.scrollTo(0, document.body.scrollHeight)
        })
        .catch(error => {
          this.validating = false
          console.log(error)
        })
    }
  }
}
</script>
