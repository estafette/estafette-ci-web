import DS from 'ember-data';

export default DS.Model.extend({
    key: DS.attr(),
    value: DS.attr(),
    origin: DS.belongsTo('origin')
});
