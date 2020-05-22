import axios from 'axios'

export default {
  loadPipelines (filter, pagination) {
    console.log('pipelineService.loadPipelines', filter, pagination)

    var labelFilterParams = ''
    if (filter && filter.labels && filter.labels.length > 0) {
      labelFilterParams = filter.labels.split(',').join('&filter[labels]=')
    }

    var statusFilter = `filter[status]=${filter.status}`
    if (filter.status === 'running') {
      statusFilter += `&filter[status]=pending&filter[status]=canceling`
    }

    return axios.get(`/api/pipelines?${statusFilter}&filter[since]=${filter.since}&filter[search]=${filter.search}&filter[labels]=${labelFilterParams}&page[number]=${pagination.page}&page[size]=${pagination.size}`)
  }
}
