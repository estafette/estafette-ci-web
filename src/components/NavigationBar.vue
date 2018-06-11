<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'Home'}">Estafette CI</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link :to="{ name: 'Pipelines'}">Pipelines</router-link>
            <router-link :to="{ name: 'Targets'}">Targets</router-link>
            <router-link :to="{ name: 'Statistics'}">Statistics</router-link>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
  name: 'navigation-bar',
  data: function () {
    return {}
  }
}
</script>
