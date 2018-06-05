import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pipelines');
  this.route('targets');
  this.route('statistics');
  this.route('pipeline-builds', { path: 'pipelines/:repoSource/:repoOwner/:repoName/builds'});
  this.route('pipeline-statistics', { path: 'pipelines/:repoSource/:repoOwner/:repoName/statistics'});
  this.route('pipeline-releases', { path: 'pipelines/:repoSource/:repoOwner/:repoName/releases'});
  this.route('pipeline-build-details', { path: 'pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision'});
  this.route('pipeline-build-logs', { path: 'pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision/logs'});
  this.route('pipeline-build-manifest', { path: 'pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision/manifest'});
});

export default Router;
