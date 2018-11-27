<template>
    <div class="col-12 col-xxl-6 p-0 graph">
      <div class="rounded border" :class="`border-${status}`">
        <spinner v-if="series.length == 0 || series[0].data.length == 0" :color="status"/>
        <apexcharts width="100%" :type="options.type" :options="options" :series="series"></apexcharts>
      </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import upperFirst from 'lodash/upperFirst'

export default {
  props: {
    type: String,
    status: String,
    pipeline: Object
  },

  components: {
    apexcharts: VueApexCharts
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
          title: {
            text: 'seconds'
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
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/stats/${this.type}durations`)
        .then(response => {
          this.updateSeries(response.data.durations)
          this.periodicallyRefreshStat(60)
        })
        .catch(e => {
          this.errors.push(e)
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
      // init series if not done yet
      if (this.type === 'releases') {
        if (this.series.length === 0) {
          this.pipeline.releaseTargets.forEach(target => {
            if (target.actions && target.actions.length > 0) {
              target.actions.forEach(action => {
                this.series.push({
                  name: target.name + ' / ' + action.name,
                  data: []
                })
              })
            } else {
              this.series.push({
                name: target.name,
                data: []
              })
            }
          })
        }
      } else {
        if (this.series.length === 0) {
          this.series.push({
            name: 'duration',
            data: []
          })
        }
      }

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
        if (durationsMap.hasOwnProperty(key)) {
          var serie = this.series.find(s => s.name === key)
          if (serie) {
            serie.data = durationsMap[key]
          }
        }
      }
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
