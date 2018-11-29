<template>
    <div class="m-3 p-3">
      <b-form @submit="onSubmit" autocomplete="off">
        <label :for="`template-select`">Template</label>
        <b-form-select v-if="templatesOptions.length > 0" :id="`template-select`" v-model="form.template" :options="templatesOptions" v-on:change="setTemplate" class="border-primary text-primary" />

        <div v-for="placeholder in placeholders" v-bind:key="placeholder.name" class="mt-3">
          <label :for="`placeholder-${placeholder.name}`">{{placeholder.name}}</label>
          <b-form-input :id="`placeholder-${placeholder.name}`" v-model="form.placeholders[placeholder.name]" type="text" :placeholder="`Enter ${placeholder.name}`"></b-form-input>
        </div>

        <b-button v-if="form.template" type="submit" variant="primary" class="mt-3">Generate</b-button>
      </b-form>

      <h3 v-if="manifest">.estafette.yaml</h3>
      <pre v-if="manifest" class="bg-light p-3"><code>{{manifest}}</code></pre>
    </div>
</template>

<script>
export default {
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
      refresh: true
    }
  },

  created () {
    this.loadTemplates()
  },

  methods: {
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

      this.axios.post(`/api/manifest/generate`, this.form)
        .then(response => {
          this.manifest = response.data.manifest
        })
        .catch(error => {
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
