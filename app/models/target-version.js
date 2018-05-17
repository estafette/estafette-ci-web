import DS from 'ember-data';

export default DS.Model.extend({
    target: DS.belongsTo('target'),
    buildVersion: DS.attr(),
    buildStatus: DS.attr(),
    pipeline: DS.belongsTo('pipeline')
});
