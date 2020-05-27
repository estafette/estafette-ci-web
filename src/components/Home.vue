<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12">
        <b-jumbotron
          lead="Your portal to application development & management"
          bg-variant="white"
          text-variant="dark"
          header-level="3"
          container-fluid
          fluid
          class="mb-3 pl-4 pt-4 pr-4 pb-5 rounded border"
        >
          <template
            v-slot:header
          >
            <span class="text-success font-italic">
              Estafette
            </span>
          </template>

          <p>For more information visit the public website.</p>

          <b-button
            variant="success"
            href="https://estafette.io/"
            target="_blank"
          >
            Learn more
          </b-button>
        </b-jumbotron>
      </div>

      <div
        v-for="section in sections"
        :key="section.header"
        class="col-12 col-md-6 col-xxxl-3"
      >
        <b-jumbotron
          :header="section.header"
          :lead="section.lead"
          :bg-variant="section.bgVariant"
          :text-variant="section.textVariant"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="section.to"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>
    </div>

    <div class="row">
      <my-pipelines
        title="Pipelines you recently committed to"
        filter="recent-committer"
        type="build"
        class="col-12 col-md-6"
      />
      <my-pipelines
        title="Pipelines you recently released"
        filter="recent-releaser"
        type="release"
        class="col-12 col-md-6"
      />
    </div>
  </div>
</template>

<script>
import { BJumbotron, BButton } from 'bootstrap-vue'
import MyPipelines from '@/components/MyPipelines'

export default {
  components: {
    BJumbotron,
    BButton,
    MyPipelines
  },

  data: function () {
    return {
      sections: [
        {
          header: 'Builds & releases',
          lead: 'View and release applications',
          bgVariant: 'success',
          textVariant: 'white',
          to: { name: 'Pipelines' }
        },
        {
          header: 'Catalog',
          lead: 'View ownership, performance and more',
          bgVariant: 'info',
          textVariant: 'white',
          to: { name: 'Catalog' }
        },
        {
          header: 'Insights',
          lead: 'See stats, rankings and trends',
          bgVariant: 'primary',
          textVariant: 'white',
          to: { name: 'Insights' }
        },
        {
          header: 'Create',
          lead: 'Generate manifests and secrets',
          bgVariant: 'warning',
          textVariant: 'dark',
          to: { name: 'Create' }
        }
      ]
    }
  }
}
</script>
