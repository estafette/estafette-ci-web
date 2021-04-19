<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter pipelines based on when they're last built or released"
    >
      <font-awesome-icon icon="upload" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="releaseTargetOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload)

export default {
  components: {
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    model: {
      type: String,
      default: null
    },
    onChange: {
      type: Function,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      mutableModel: this.model
    }
  },

  computed: {
    releaseTargetOptions () {
      const releaseTargetOptions = [
        { value: 'all', text: 'All release targets' }
      ]

      if (this.pipeline && this.pipeline.releaseTargets) {
        this.pipeline.releaseTargets.forEach(rt => {
          releaseTargetOptions.push({ value: rt.name, text: rt.name })
        })
      }

      return releaseTargetOptions
    }
  }
}
</script>
