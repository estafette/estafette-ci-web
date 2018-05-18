import { camelize } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute(attr) {
      return camelize(attr);
    }
  });