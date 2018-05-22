import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pipelines/pipeline/releases/release', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pipelines/pipeline/releases/release');
    assert.ok(route);
  });
});
