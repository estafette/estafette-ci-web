import DS from 'ember-data';

export default DS.Model.extend({
    destination: DS.belongsTo('destination'),
    buildVersion: DS.attr(),
    buildStatus: DS.attr(),
    origin: DS.belongsTo('origin')
});
