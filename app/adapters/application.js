import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',

    shouldReloadRecord(store, snapshot) {
        return false;
    },
    shouldReloadAll(store, snapshot) {
        return false;
    },
    shouldBackgroundReloadRecord(store, snapshot) {
        return true;
    },
    shouldBackgroundReloadAll(store, snapshot) {
        return true;
    }
});
