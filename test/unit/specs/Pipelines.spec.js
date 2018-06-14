import Vue from 'vue'
import Pipelines from '@/components/Pipelines'

describe('Pipelines.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Pipelines)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('table th').textContent)
      .toEqual('Pipeline')
  })
})
