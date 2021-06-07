<template>
  <div class="p-0 graph bg-white">
    <div
      class="rounded border"
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
    apexcharts: () => import(/* webpackChunkName: "vue-apexcharts" */ 'vue-apexcharts')
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
          id: `${this.type}-cpu-timeline`,
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
          text: upperFirst(this.type) + ' max CPU',
          align: 'center',
          style: {
            fontSize: '24px',
            color: this.getColor(this.status)
          }
        },
        legend: {
          showForSingleSeries: this.type !== 'builds'
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
            text: 'cpu cores'
          },
          labels: {
            formatter: y => {
              if (typeof y !== 'undefined') {
                return this.$options.filters.formatNumber(y)
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
                return this.$options.filters.formatNumber(y)
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

        case 'warning':
          return '#ffc107'
      }
      return '#212529'
    },

    getColors (status) {
      const bootstrapColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
      const mainColor = this.getColor(this.status)
      const colors = [mainColor]

      for (const index in bootstrapColors) {
        const color = bootstrapColors[index]
        if (color !== mainColor) {
          colors.push(color)
        }
      }

      return colors
    },

    loadStat () {
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/stats/${this.type}cpu?filter[last]=${this.filter.last}`)
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

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
      }
    },

    updateSeries (measurements) {
      // filter outliers
      const measurementsMap = {}
      measurements.forEach(measurement => {
        // generate key
        let key = 'cpu'
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

        measurementsMap[key].push({ x: measurement.insertedAt, y: measurement.cpuMaxUsage })
      })

      // update series from measurements dictionary
      for (const key in measurementsMap) {
        let serie = this.series.find(s => s.name === key)
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
