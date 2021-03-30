<template>
  <div>
    <b-form
      @submit="onSubmit"
      autocomplete="off"
      class="rounded border bg-white p-3"
    >
      <b-form-group
        description="Required for use as a Kubernetes secret."
      >
        <b-form-checkbox
          id="base64"
          v-model="form.base64"
        >
          Base64 encode
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        description="To encrypt the secret envelope a second time for injecting it into Estafette's configmap."
        v-if="showDoubleEncrypt"
      >
        <b-form-checkbox
          id="double"
          v-model="form.double"
        >
          Double encrypt
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        label="Pipeline restriction regex"
        label-for="pipelineAllowList"
        description="The pipeline to restrict decryption of the secret for."
      >
        <b-form-input
          id="pipelineAllowList"
          v-model="form.pipelineAllowList"
          :readonly="pipelineAllowListReadonly"
          type="text"
        />
      </b-form-group>

      <b-form-group
        label="Value to encrypt"
        label-for="value"
        description="The encrypted secret works only for this Estafette CI installation. Try to avoid newlines, this can cause errors during pipeline execution."
      >
        <b-form-textarea
          id="value"
          v-model="form.value"
          placeholder="Paste your value to be encrypted"
          :rows="5"
          class="border bg-light"
        />
      </b-form-group>

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
import { BForm, BFormCheckbox, BFormInput, BFormTextarea, BFormGroup, BButton, BTooltip } from 'bootstrap-vue'

export default {
  components: {
    spinner,
    BForm,
    BFormCheckbox,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BButton
  },
  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    }
  },
  directives: {
    BTooltip
  },
  data: function () {
    return {
      form: {
        base64: false,
        double: false,
        pipelineAllowList: this.repoSource !== null && this.repoOwner !== null && this.repoName !== null ? `${this.repoSource}/${this.repoOwner}/${this.repoName}` : '.*',
        value: null
      },
      pipelineAllowListReadonly: this.$route.name !== 'AdminSecretEncrypter',
      showDoubleEncrypt: this.$route.name === 'AdminSecretEncrypter',
      encrypting: false,
      secret: null
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.encrypting = true

      this.axios.post('/api/manifest/encrypt', this.form)
        .then(response => {
          this.encrypting = false
          this.secret = response.data.secret
          window.scrollTo(0, document.body.scrollHeight)
        })
        .catch(e => {
          this.encrypting = false
          console.warn(e)
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
