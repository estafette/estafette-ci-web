<template>
  <div>
    <b-form
      @submit="onSubmit"
      autocomplete="off"
      class="rounded border bg-white p-3"
    >
      <b-form-group
        label="Template"
        label-for="template-select"
      >
        <b-form-select
          v-if="templatesOptions.length > 0"
          :id="`template-select`"
          v-model="form.template"
          :options="templatesOptions"
          @change="setTemplate"
          class="border-primary text-primary"
        />
      </b-form-group>

      <div
        v-for="placeholder in placeholders"
        :key="placeholder.name"
        class="mt-3"
      >
        <b-form-group
          :label="placeholder.name | splitCamelcase"
          :label-for="`placeholder-${placeholder.name}`"
        >
          <b-form-input
            :id="`placeholder-${placeholder.name}`"
            v-model="form.placeholders[placeholder.name]"
            type="text"
            :placeholder="'Enter ' + $options.filters.splitCamelcase(placeholder.name)"
          />
        </b-form-group>
      </div>

      <b-button
        v-if="form.template"
        type="submit"
        variant="primary"
        class="mt-3"
      >
        Generate
      </b-button>
    </b-form>

    <div v-if="generating">
      <spinner color="secondary" />
    </div>

    <div
      v-if="manifest"
      class="mt-4"
    >
      <h5>Manifest</h5>
      <p>Store the content below in file <code>.estafette.yaml</code> in the root of your application repository, add it to git and push it to the origin and Estafette CI will automatically build your application, regardless of which branch you push.</p>

      <div class="pre-wrapper">
        <pre class="bg-light p-3"><code>{{ manifest }}</code></pre>
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
import Spinner from '@/components/Spinner'
import { BForm, BFormSelect, BFormInput, BFormGroup, BButton, BTooltip } from 'bootstrap-vue'

export default {
  components: {
    Spinner,
    BForm,
    BFormSelect,
    BFormInput,
    BFormGroup,
    BButton
  },
  directives: {
    BTooltip
  },
  props: {
    query: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      form: {
        template: null,
        placeholders: {}
      },
      templates: null,
      templatesOptions: [],
      placeholders: [],
      manifest: null,
      generating: false,
      refresh: true
    }
  },

  created () {
    this.loadTemplates()
  },

  methods: {
    copy () {
      const el = document.createElement('textarea')
      el.value = this.manifest
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },

    loadTemplates () {
      this.axios.get('/api/manifest/templates')
        .then(response => {
          this.templates = response.data.templates

          const options = [{ value: null, text: 'Please select a template' }]
          this.templates.forEach(template => {
            options.push({ value: template.template, text: template.template })
          })

          this.templatesOptions = options
        })
        .catch(e => {
          this.periodicallyRefreshTemplates(30)
        })
    },

    setTemplate (value) {
      const template = this.templates.find(t => t.template === value)
      if (template) {
        const placeholders = []
        template.placeholders.forEach(placeholder => {
          placeholders.push({ name: placeholder })
        })

        this.placeholders = placeholders

        this.manifest = null
      }
    },

    onSubmit (evt) {
      evt.preventDefault()
      this.generating = true
      this.manifest = null

      this.axios.post('/api/manifest/generate', this.form)
        .then(response => {
          this.generating = false
          this.manifest = response.data.manifest
        })
        .catch(e => {
          this.generating = false
          console.warn(e)
        })
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
