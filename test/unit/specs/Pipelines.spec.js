import Vue from 'vue'
import Pipelines from '@/components/Pipelines'

describe('Pipelines.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Pipelines)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#main > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)').textContent)
      .toEqual('Pipeline')
  })
})
