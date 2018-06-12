import Vue from 'vue'
import PipelinesList from '@/components/PipelinesList'

describe('PipelinesList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PipelinesList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('table th').textContent)
      .toEqual('Pipeline')
  })
})
