import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pipelines/pipeline/builds/build', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pipelines/pipeline/builds/build');
    assert.ok(route);
  });
});
