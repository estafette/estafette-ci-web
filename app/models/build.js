import DS from 'ember-data';

export default DS.Model.extend({
    repoSource: DS.attr(),
    repoOwner: DS.attr(),
    repoName: DS.attr(),
    repoBranch: DS.attr(),
    repoRevision: DS.attr(),
    buildVersion: DS.attr(),
    buildStatus: DS.attr(),
    buildProgress: DS.attr(),
    labels: DS.attr(),
});
