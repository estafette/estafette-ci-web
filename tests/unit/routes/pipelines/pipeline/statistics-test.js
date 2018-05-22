import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pipelines/pipeline/statistics', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pipelines/pipeline/statistics');
    assert.ok(route);
  });
});
