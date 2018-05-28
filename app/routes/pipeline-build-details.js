import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return {
            build: this.get('store').queryRecord('build', { repoSource: params.repoSource, repoOwner: params.repoOwner, repoName: params.repoName, repoRevision: params.repoRevision}),
            log: this.get('store').queryRecord('build-log', { repoSource: params.repoSource, repoOwner: params.repoOwner, repoName: params.repoName, repoBranch: params.repoBranch, repoRevision: params.repoRevision}),
        };
    }
});
