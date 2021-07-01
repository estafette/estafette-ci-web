<template>
  <div
    v-if="visible"
    class="row m-0 pt-3 pr-2 pb-3 pl-2 border-0 rounded-0 bg-light"
  >
    <property-block
      label="Image"
    >
      <span
        v-if="step.image && step.image.name"
        :title="step.image.name+':'+step.image.tag"
      >
        {{ step.image.name }}:{{ step.image.tag }}
      </span>
      <span v-else>
        -
      </span>
      <log-stage-icons
        :step="step"
        :max-lines-to-show="maxLinesToShow"
      />
    </property-block>
    <property-block
      label="Image size"
    >
      <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
        <span
          v-if="step.image && step.image.imageSize"
          :title="step.image.imageSize | formatBytes"
        >
          {{ step.image.imageSize | formatBytes }}
        </span>
        <em
          v-else
        >
          -
        </em>
      </span>
      <span v-else>
        -
      </span>
    </property-block>
    <property-block
      label="Pull time"
      class="col-xxxl-2"
    >
      <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
        <span
          v-if="step.image.pullDuration && step.image.pullDuration > 0"
          :title="step.image.pullDuration | formatDuration"
        >
          {{ step.image.pullDuration | formatDuration }}
        </span>
        <em
          v-else
        >
          -
        </em>
      </span>
      <span v-else>
        -
      </span>
    </property-block>
    <property-block
      label="Execution time"
      class="col-xxxl-2"
      :value="step.duration | formatDuration"
    >
      <span v-if="step.duration && (step.status == 'SUCCEEDED' || step.status == 'FAILED')">
        {{ step.duration | formatDuration }}
      </span>
      <span v-else>
        -
      </span>
    </property-block>
    <property-block
      label="Total time"
      class="col-xxxl-2"
      :value="(step.image ? step.image.pullDuration : 0) + step.duration | formatDuration"
    >
      <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
        {{ (step.image ? step.image.pullDuration : 0) + step.duration | formatDuration }}
      </span>
      <span v-else>
        -
      </span>
    </property-block>
  </div>
</template>

<script>
import LogStageIcons from '@/components/LogStageIcons'
import PropertyBlock from '@/components/PropertyBlock'

export default {
  components: {
    LogStageIcons,
    PropertyBlock
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    step: {
      type: Object,
      default: null
    },
    maxLinesToShow: {
      type: Number,
      default: 1000
    }
  }
}
</script>
