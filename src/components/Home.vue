<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12">
        <b-jumbotron
          lead="Your portal to application development & management"
          bg-variant="white"
          text-variant="dark"
          header-level="1"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <template
            v-slot:header
          >
            <span class="text-success font-italic">
              Estafette
            </span>
          </template>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Builds & releases"
          lead="View and release applications"
          bg-variant="success"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Pipelines' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Catalog"
          lead="View ownership, performance and more"
          bg-variant="info"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Pipelines' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Insights"
          lead="See stats, rankings and trends"
          bg-variant="primary"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Statistics' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Create"
          lead="Generate manifests and secrets"
          bg-variant="warning"
          text-variant="dark"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Manifest' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import { BJumbotron, BButton } from 'bootstrap-vue'

export default {
  components: {
    BJumbotron,
    BButton
  }
}
</script>
