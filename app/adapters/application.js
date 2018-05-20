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
    }
});
