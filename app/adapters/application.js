import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',

    shouldReloadRecord(store, snapshot) {
        return true;
    },
    shouldReloadAll(store, snapshot) {
        return true;
    },
    shouldBackgroundReloadRecord(store, snapshot) {
        return false;
    },
    shouldBackgroundReloadAll(store, snapshot) {
        return false;
    },
    
    urlForQueryRecord(query, modelName) {
        switch(modelName) {
            case 'pipeline':
                return `/api/pipelines/${query.repoSource}/${query.repoOwner}/${query.repoName}`;
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
