<template>
  <div class="m-3 p-3">
    <b-form
      @submit="onSubmit"
      autocomplete="off"
    >
      <label for="base64">
        Base64 encode <span class="text-secondary">
          (this is needed if you use it as a Kubernetes secret)
        </span>
      </label>
      <b-form-checkbox
        id="base64"
        v-model="form.base64"
      />

      <label for="double">
        Double encrypt <span class="text-secondary">
          (this encrypts the secret envelope a second time for injecting it into Estafette's configmap)
        </span>
      </label>
      <b-form-checkbox
        id="double"
        v-model="form.double"
      />

      <label for="value">
        Value to encrypt
      </label>
      <b-form-textarea
        id="value"
        v-model="form.value"
        placeholder="Paste your value to be encrypted"
        :rows="5"
        class="border bg-light"
      />

      <b-button
        type="submit"
        variant="primary"
        class="mt-3"
      >
        Encrypt
      </b-button>
    </b-form>

    <div v-if="encrypting">
      <spinner color="secondary" />
    </div>

    <div
      v-if="secret"
      class="mt-4"
    >
      <h5>Use this in your manifest to hide secrets in plain sight!</h5>
      <div class="pre-wrapper">
        <pre class="bg-light p-3"><code>{{ secret }}</code></pre>
        <b-button
          class="btn-clipboard"
          @click="copy"
          v-b-tooltip.click
          title="Copied!"
        >
          Copy
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from '@/components/Spinner'
import bForm from 'bootstrap-vue/es/components/form/form'
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bFormTextarea from 'bootstrap-vue/es/components//form-textarea/form-textarea'
import bButton from 'bootstrap-vue/es/components/button/button'
import bTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'

export default {
  components: {
    spinner,
    bForm,
    bFormCheckbox,
    bFormTextarea,
    bButton
  },
  directives: {
    bTooltip
  },
  data: function () {
    return {
      form: {
        base64: false,
        double: false,
        value: null
      },
      encrypting: false,
      secret: null
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.encrypting = true

      this.axios.post(`/api/manifest/encrypt`, this.form)
        .then(response => {
          this.encrypting = false
          this.secret = response.data.secret
          window.scrollTo(0, document.body.scrollHeight)
        })
        .catch(error => {
          this.encrypting = false
          console.log(error)
        })
    },

    copy () {
      const el = document.createElement('textarea')
      el.value = this.secret
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }
}
</script>

<style scoped>
label {
  display: block;
}
</style>
