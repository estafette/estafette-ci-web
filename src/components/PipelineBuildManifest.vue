<template>
  <div>
    <b-form-group
      description="Estafette uses a lot of sane defaults to keep your manifest small and readable."
      class="m-3"
    >
      <b-form-checkbox v-model="showDefaults">
        Show defaults
      </b-form-checkbox>
    </b-form-group>

    <pre
      v-if="showDefaults"
      class="bg-light m-3 p-3"
    >{{ build.manifestWithDefaults }}</pre>
    <pre
      v-else
      class="bg-light m-3 p-3"
    >{{ build.manifest }}</pre>
  </div>
</template>

<script>
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'

export default {
  components: {
    bFormCheckbox,
    bFormGroup
  },
  props: {
    build: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      showDefaults: false
    }
  }
}
</script>
