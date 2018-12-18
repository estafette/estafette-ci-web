<template>
    <div class="m-3 p-3">
      <b-form @submit="onSubmit" autocomplete="off">
        <label :for="`template-select`">Template</label>
        <b-form-select v-if="templatesOptions.length > 0" :id="`template-select`" v-model="form.template" :options="templatesOptions" v-on:change="setTemplate" class="border-primary text-primary" />

        <div v-for="placeholder in placeholders" v-bind:key="placeholder.name" class="mt-3">
          <label :for="`placeholder-${placeholder.name}`">{{placeholder.name | splitCamelcase}}</label>
          <b-form-input :id="`placeholder-${placeholder.name}`" v-model="form.placeholders[placeholder.name]" type="text" :placeholder="'Enter ' + $options.filters.splitCamelcase(placeholder.name)"></b-form-input>
        </div>

        <b-button v-if="form.template" type="submit" variant="primary" class="mt-3">Generate</b-button>
      </b-form>

      <div v-if="generating">
        <spinner color="secondary"/>
      </div>

      <div v-if="manifest" class="mt-4">
        <h5>Manifest</h5>
        <p>Store the content below in file <code>.estafette.yaml</code> in the root of your application repository, add it to git and push it to the origin and Estafette CI will automatically build your application, regardless of which branch you push.</p>

        <div class="pre-wrapper">
          <pre class="bg-light p-3"><code>{{manifest}}</code></pre>
          <b-button class="btn-clipboard" v-on:click="copy" v-b-tooltip.click title="Copied!">Copy</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'

export default {
  components: {
    'spinner': () => import(/* webpackChunkName: "spinner" */ '@/components/Spinner'),
    'b-form': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/form/form'),
    'b-form-select': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/form-select/form-select'),
    'b-form-input': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/form-input/form-input'),
    'b-button': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/button/button')
  },
  directives: {
    'b-tooltip': vBTooltip
  },
  props: {
    query: Object
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
      this.axios.get(`/api/manifest/templates`)
        .then(response => {
          this.templates = response.data.templates

          var options = [{ value: null, text: 'Please select a template' }]
          this.templates.forEach(template => {
            options.push({ value: template.template, text: template.template })
          })

          this.templatesOptions = options
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshTemplates(30)
        })
    },

    setTemplate (value) {
      var template = this.templates.find(t => t.template === value)
      if (template) {
        var placeholders = []
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

      this.axios.post(`/api/manifest/generate`, this.form)
        .then(response => {
          this.generating = false
          this.manifest = response.data.manifest
        })
        .catch(error => {
          this.generating = false
          console.log(error)
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
