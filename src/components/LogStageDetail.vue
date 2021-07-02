<template>
  <div
    v-if="visible && step.logLines && step.logLines.length > 0"
  >
    <div
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

    <div
      class="text-light text-monospace bg-dark m-0 p-3 pr-5"
    >
      <div
        class="row no-gutters"
        v-for="(line, lineIndex) in cappedLogLines(step.logLines)"
        :key="line.line ? line.line : lineIndex"
      >
        <div
          v-if="showTimestamps"
          class="col-1 log-timestamp text-white-50 d-none d-xl-flex"
        >
          {{ line.timestamp | moment('YYYY-MM-DD HH:mm:ss') }}
        </div>
        <div
          class="col log-text"
          v-html="formatLog(line.text)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AnsiUp from 'ansi_up'
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
    },
    showTimestamps: {
      type: Boolean,
      default: false
    },
    showTruncatedLogs: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatLog (value) {
      if (!value) return value
      const ansi = new AnsiUp()
      return ansi.ansi_to_html(value)
    },

    cappedLogLines (logLines) {
      const firstLinesToShow = 5
      if (!logLines || logLines.length <= this.maxLinesToShow || this.showTruncatedLogs) {
        return logLines
      }

      const firstLines = logLines.slice(0, firstLinesToShow)
      const truncatedLines = logLines.slice(firstLinesToShow, firstLinesToShow + 3).map((l, i) => {
        if (i === 1) {
          return {
            line: l.line,
            timestamp: null,
            streamType: l.streamType,
            text: '== TOO MANY LINES; TRUNCATED BY ESTAFETTE; SHOW ALL BY TOGGLING \'TRUNCATED LOGS\' IN THE TOOLBAR ON THE RIGHT =='
          }
        }

        return {
          line: l.line,
          timestamp: null,
          streamType: l.streamType,
          text: ' '
        }
      })
      const lastLines = logLines.slice(logLines.length - this.maxLinesToShow + firstLinesToShow + 3)

      // get first 5 lines and last 1955
      return firstLines.concat(truncatedLines).concat(lastLines)
    }
  }
}
</script>
