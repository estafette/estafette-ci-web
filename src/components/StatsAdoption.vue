<template>
    <div class="col-12 col-xxl-6 p-0">
      <div>
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
    color: String
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
          style: {
            fontSize: '24px',
            color: this.color
          }
        },
        subtitle: {
          text: 'by repositories',
          offsetX: 10,
          offsetY: 35,
          style: {
            fontSize: '14px',
            color: '#6c757d'
          }
        },
        type: 'line',
        xaxis: {
          type: 'datetime'
        },
        colors: [this.color]
      },
      series: [{
        name: upperFirst(this.type),
        data: []
      }]
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
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

      this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
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
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
