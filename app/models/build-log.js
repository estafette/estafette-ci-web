import DS from 'ember-data';

export default DS.Model.extend({
    repoSource: DS.attr(),
    repoOwner: DS.attr(),
    repoName: DS.attr(),
    repoBranch: DS.attr(),
    repoRevision: DS.attr(),
    steps: DS.attr(),
    insertedAt: DS.attr(),
});
