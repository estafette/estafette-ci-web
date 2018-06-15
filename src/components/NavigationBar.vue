<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'Home'}" class="navbar-brand">Estafette CI</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link :to="{ name: 'Pipelines'}" class="nav-item nav-link">Pipelines</router-link>
            <router-link :to="{ name: 'Targets'}" class="nav-item nav-link disabled">Targets</router-link>
            <router-link :to="{ name: 'Statistics'}" class="nav-item nav-link disabled">Statistics</router-link>
        </div>
    </div>
    </nav>
</template>
