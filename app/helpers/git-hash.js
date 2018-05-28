import { helper } from '@ember/component/helper';

export function gitHash([value]) {
  if (value && value.length > 6){
    return value.substring(0,6);  
  }
  return value;
}

export default helper(gitHash);
