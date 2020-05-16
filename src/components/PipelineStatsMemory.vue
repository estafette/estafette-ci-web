<template>
  <div class="p-0 graph bg-white">
    <div
      class="rounded border"
      :class="`border-${status}`"
    >
      <spinner
        v-if="series.length == 0"
        :color="status"
      />
      <apexcharts
        width="100%"
        :type="options.type"
        :options="options"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import upperFirst from 'lodash/upperFirst'

export default {
  components: {
    Spinner,
    'apexcharts': () => import(/* webpackChunkName: "vue-apexcharts" */ 'vue-apexcharts')
  },

  props: {
    type: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    },
    filter: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      options: {
        chart: {
          id: `${this.type}-memory-timeline`,
          animations: {
            enabled: true,
            easing: 'easeinout',
            dynamicAnimation: {
              enabled: true,
              speed: 500
            }
          },
          toolbar: {
            show: false
          }
        },
        markers: {
          size: 0,
          hover: {
            size: 6
          }
        },
        title: {
          text: upperFirst(this.type) + ' max memory',
          align: 'center',
          style: {
            fontSize: '24px',
            color: this.getColor(this.status)
          }
        },
        type: 'line',
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          min: 0,
          title: {
            text: 'duration'
          },
          labels: {
            formatter: y => {
              if (typeof y !== 'undefined') {
                return this.$options.filters.formatBytes(y)
              }
              return y
            }
          }
        },
        colors: this.getColors(this.status),
        grid: {
          show: true,
          yaxis: {
            lines: {
              show: false,
              animate: false
            }
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: y => {
              if (typeof y !== 'undefined') {
                return this.$options.filters.formatBytes(y)
              }
              return y
            }
          }
        }
      },
      series: [],
      refresh: true
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    getColor (status) {
      switch (status) {
        case 'primary':
          return '#007bff'

        case 'success':
          return '#28a745'
      }
      return '#212529'
    },

    getColors (status) {
      var bootstrapColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
      var mainColor = this.getColor(this.status)
      var colors = [mainColor]

      for (var index in bootstrapColors) {
        var color = bootstrapColors[index]
        if (color !== mainColor) {
          colors.push(color)
        }
      }

      return colors
    },

    loadStat () {
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/stats/${this.type}memory?filter[last]=${this.filter.last}`)
        .then(response => {
          this.updateSeries(response.data.measurements)
          this.periodicallyRefreshStat(60)
        })
        .catch(e => {
          this.periodicallyRefreshStat(120)
        })
    },

    periodicallyRefreshStat (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
      }
    },

    updateSeries (measurements) {
      // filter outliers
      var measurementsMap = {}
      measurements.forEach(measurement => {
        // generate key
        key = 'memory'
        if (measurement.name) {
          key = measurement.name
          if (measurement.action && measurement.action !== '') {
            key += ' / ' + measurement.action
          }
        }

        if (!measurementsMap[key]) {
          // init key in dictionary
          measurementsMap[key] = []
        }

        measurementsMap[key].push({ x: measurement.insertedAt, y: measurement.memoryMaxUsage })
      })

      // update series from durations dictionary
      for (var key in measurementsMap) {
        var serie = this.series.find(s => s.name === key)
        if (!serie) {
          serie = {
            name: key,
            data: []
          }
          this.series.push(serie)
        }

        serie.data = measurementsMap[key]
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadStat()
      },
      deep: true
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
