import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel(/* transition */) {
        this.transitionTo('pipeline-build-logs'); // Implicitly aborts the on-going transition.
    }});
