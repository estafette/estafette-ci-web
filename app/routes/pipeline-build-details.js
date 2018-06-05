import Route from '@ember/routing/route';

export default Route.extend({
    afterModel(model) {
        this.replaceWith('pipeline-build-logs', model.repoSource ,model.repoOwner, model.repoName, model.repoRevision); // Implicitly aborts the on-going transition.
    },
});
