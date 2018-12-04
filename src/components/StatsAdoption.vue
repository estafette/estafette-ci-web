<template>
    <div class="col-12 col-xxl-6 p-0 graph">
      <div class="rounded border" :class="`border-${status}`">
        <spinner v-if="series[0].data.length == 0" :color="status"/>
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
    status: String
  },

  components: {
    apexcharts: VueApexCharts
  },

  data: function () {
    return {
      options: {
        chart: {
          id: `${this.type}-adoption-rate`,
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
          text: upperFirst(this.type) + ' adoption rate',
          align: 'center',
          style: {
            fontSize: '24px',
            color: this.getColor(this.status)
          }
        },
        subtitle: {
          text: 'by repositories',
          align: 'center',
          offsetY: 35,
          style: {
            fontSize: '14px',
            color: '#6c757d'
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
            text: this.type
          }
        },
        colors: [this.getColor(this.status)],
        grid: {
          show: true,
          yaxis: {
            lines: {
              show: false,
              animate: false
            }
          }
        }
      },
      series: [{
        name: upperFirst(this.type),
        data: []
      }],
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

    loadStat () {
      this.axios.get(`/api/stats/${this.type}adoption`)
        .then(response => {
          this.updateSeries(response.data.datetimes)
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

    updateSeries (times) {
      var data = []
      var count = 0
      times.forEach(time => {
        data.push({ x: time, y: ++count })
      })

      this.series[0].data = data
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
