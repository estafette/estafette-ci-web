import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',

    shouldReloadRecord() {
        return true;
    },
    shouldReloadAll() {
        return false;
    },
    shouldBackgroundReloadRecord() {
        return false;
    },
    shouldBackgroundReloadAll() {
        return true;
    },
    
    urlForQueryRecord(query, modelName) {
        switch(modelName) {
            case 'pipeline':
                return `/api/pipelines/${query.repoSource}/${query.repoOwner}/${query.repoName}`;
            case 'build':
                return `/api/pipelines/${query.repoSource}/${query.repoOwner}/${query.repoName}/builds/${query.repoRevision}`;
            default:
              return this._super(...arguments);
          }
    },
    urlForQuery (query, modelName) {
        switch(modelName) {
            case 'build':
                return `/api/pipelines/${query.repoSource}/${query.repoOwner}/${query.repoName}/builds`;
            default:
              return this._super(...arguments);
          }
    },
});
