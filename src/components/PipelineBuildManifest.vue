<template>
  <div>
    <b-form-checkbox v-model="showDefaults" class="m-3">
      Show defaults
    </b-form-checkbox>
    <pre v-if="showDefaults" class="bg-light m-3 p-3">{{build.manifestWithDefaults}}</pre>
    <pre v-else class="bg-light m-3 p-3">{{build.manifest}}</pre>
  </div>
</template>

<script>
export default {
  props: {
    build: Object
  },
  data: function () {
    return {
      showDefaults: false
    }
  }
}
</script>
