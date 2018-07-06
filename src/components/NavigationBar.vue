<template>
    <b-navbar toggleable="sm" type="dark" variant="dark">

        <b-navbar-brand :to="{ name: 'Pipelines'}">Estafette CI</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'Pipelines'}">Pipelines</b-nav-item>
                <b-nav-item :to="{ name: 'Targets'}"  disabled>Targets</b-nav-item>
                <b-nav-item :to="{ name: 'Statistics'}" >Statistics</b-nav-item>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
</template>
