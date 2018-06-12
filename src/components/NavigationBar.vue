<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'Home'}" class="navbar-brand">Estafette CI</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link :to="{ name: 'Pipelines'}" active-class="active" class="nav-item nav-link">Pipelines</router-link>
            <router-link :to="{ name: 'Targets'}" active-class="active" class="nav-item nav-link">Targets</router-link>
            <router-link :to="{ name: 'Statistics'}" active-class="active" class="nav-item nav-link">Statistics</router-link>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>
