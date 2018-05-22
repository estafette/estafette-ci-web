import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pipelines', function() {
    this.route('pipeline', { path: '/:repoSource/:repoOwner/:repoName'}, function() {
      this.route('builds', function() {
        this.route('build', {path: '/:repoRevision'});
      });
      this.route('releases', function() {
        this.route('release');
      });
      this.route('statistics');
    });
  });
  this.route('targets');
  this.route('statistics');
});

export default Router;
