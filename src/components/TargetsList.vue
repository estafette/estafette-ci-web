<template>
  <div class="m-3">
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Target</th>
        <th scope="col">Type</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="target in targets" v-bind:key="target.name">
        <td scope="row">{{target.name}}</td>
        <td>
            <button type="button" class="btn btn-light btn-sm">{{target.type}}</button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TargetsList',
  data: function () {
    return {
      targets: [
        {
          name: 'development',
          type: 'Kubernetes Engine'
        },
        {
          name: 'staging',
          type: 'Kubernetes Engine'
        },
        {
          name: 'production',
          type: 'Kubernetes Engine'
        },
        {
          name: 'tooling',
          type: 'Kubernetes Engine'
        },
        {
          name: 'nuget-org',
          type: 'NuGet Repository'
        },
        {
          name: 'myget-org',
          type: 'NuGet Repository'
        },
        {
          name: 'myget-org',
          type: 'Maven Repository'
        },
        {
          name: 'docker-hub',
          type: 'Docker Registry'
        },
        {
          name: 'docker-hub-tag',
          type: 'Docker Tag'
        },
        {
          name: 'gcr.io',
          type: 'Docker Registry'
        },
        {
          name: 'github-release',
          type: 'Github Release'
        },
        {
          name: 'github-tag',
          type: 'Git Tag'
        },
        {
          name: 'bitbucket-tag',
          type: 'Git Tag'
        }
      ],
      errors: []
    }
  }
}
</script>
