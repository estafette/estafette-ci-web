import { helper } from '@ember/component/helper';

export function disableWhenFalse([condition]) {
  if (!condition) {
    return "disabled"
  }
  return "";
}

export default helper(disableWhenFalse);
