import { helper } from '@ember/component/helper';

export function gitHash([value]) {
  return value.substring(0,6);
}

export default helper(gitHash);
