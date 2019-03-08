<template>
  <div class="p-0 graph">
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
          id: `${this.type}-duration-timeline`,
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
          text: upperFirst(this.type) + ' duration',
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
                return this.$options.filters.formatDuration(y)
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
                return this.$options.filters.formatDuration(y)
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
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/stats/${this.type}durations?filter[last]=${this.filter.last}`)
        .then(response => {
          this.updateSeries(response.data.durations)
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

    updateSeries (durations) {
      // filter outliers
      var durationsMap = {}
      durations.forEach(duration => {
        // generate key
        key = 'duration'
        if (duration.name) {
          key = duration.name
          if (duration.action && duration.action !== '') {
            key += ' / ' + duration.action
          }
        }

        if (!durationsMap[key]) {
          // init key in dictionary
          durationsMap[key] = []
        }

        durationsMap[key].push({ x: duration.insertedAt, y: duration.duration })
      })

      // update series from durations dictionary
      for (var key in durationsMap) {
        var serie = this.series.find(s => s.name === key)
        if (!serie) {
          serie = {
            name: key,
            data: []
          }
          this.series.push(serie)
        }

        serie.data = this.filterOutliers(durationsMap[key])
      }
    },

    // https://gist.github.com/rmeissn/f5b42fb3e1386a46f60304a57b6d215a
    filterOutliers (durations) {
      if (durations.length < 10) {
        return durations.sort((a, b) => new Date(a.x) - new Date(b.x))
      }

      let values, filteredValues, q1, q3, iqr, maxValue, minValue

      // copy array fast and sort
      values = durations.slice().sort((a, b) => a.y - b.y)

      // find quartiles
      if ((values.length / 4) % 1 === 0) {
        q1 = 1 / 2 * (values[(values.length / 4)].y + values[(values.length / 4) + 1].y)
        q3 = 1 / 2 * (values[(values.length * (3 / 4))].y + values[(values.length * (3 / 4)) + 1].y)
      } else {
        q1 = values[Math.floor(values.length / 4 + 1)].y
        q3 = values[Math.ceil(values.length * (3 / 4) + 1)].y
      }

      iqr = q3 - q1
      maxValue = q3 + iqr * 1.5
      minValue = q1 - iqr * 1.5

      if (minValue >= maxValue) {
        filteredValues = values.filter((x) => (x.y >= maxValue) && (x.y <= minValue))
      } else {
        filteredValues = values.filter((x) => (x.y >= minValue) && (x.y <= maxValue))
      }

      return filteredValues.sort((a, b) => new Date(a.x) - new Date(b.x))
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
