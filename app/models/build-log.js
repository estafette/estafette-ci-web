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

        var d = 0
        this.get('steps').forEach(function (step) {
            if (step.image && step.image.imageSize) {
                d += step.image.imageSize
            }
        });

        return d;
    }),

    totalPullDuration: computed('steps', function() {

        var d = 0
        this.get('steps').forEach(function (step) {
            if (step.image && step.image.pullDuration) {
                d += step.image.pullDuration
            }
        });

        return d;
    }),

    totalDuration: computed('steps', function() {

        var d = 0
        this.get('steps').forEach(function (step) {
            if (step.duration) {
                d += step.duration
            }
        });

        return d;
    }),
});
