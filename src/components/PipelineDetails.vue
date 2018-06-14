<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{pipeline.repoSource}}/{{pipeline.repoOwner}}/{{pipeline.repoName}}</li>
      </ol>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String
  },
  data: function () {
    return {
      pipeline: {},
      errors: []
    }
  },

  created () {
    axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
      .then(response => {
        this.pipeline = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
