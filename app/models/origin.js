import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    repoSource: DS.attr(),
    repoOwner: DS.attr(),
    repoName: DS.attr(),
    repoBranch: DS.attr(),
    repoRevision: DS.attr(),
    buildVersion: DS.attr(),
    buildStatus: DS.attr(),
    buildProgress: DS.attr(),
    repoFullName: computed('repoOwner', 'repoName', function() {
        return `${this.get('repoOwner')}/${this.get('repoName')}`;
    }),
    labels: DS.hasMany('label'),
    destinationVersions: DS.hasMany('destination-version'),
});