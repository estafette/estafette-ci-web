import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    repoSource: DS.attr(),
    repoOwner: DS.attr(),
    repoName: DS.attr(),
    repoBranch: DS.attr(),
    repoRevision: DS.attr(),
    steps: DS.attr(),
    insertedAt: DS.attr(),

    totalImageSize: computed('steps', function() {
        return this.get('steps').reduce((acc, step) => {
            return acc + (step.image && step.image.imageSize ? step.image.imageSize : 0)
        }, 0);
    }),

    totalPullDuration: computed('steps', function() {
        return this.get('steps').reduce((acc, step) => {
            return acc + (step.image && step.image.pullDuration ? step.image.pullDuration : 0)
        }, 0);
    }),

    totalDuration: computed('steps', function() {
        return this.get('steps').reduce((acc, step) => {
            return acc + (step.duration ? step.duration : 0)
        }, 0);
    }),
});
