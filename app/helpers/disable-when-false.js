import { helper } from '@ember/component/helper';

export function disableWhenFalse([condition, ...rest]) {
  if (!condition) {
    return "disabled"
  }
  return "";
}

export default helper(disableWhenFalse);
