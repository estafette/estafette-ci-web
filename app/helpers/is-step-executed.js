import { helper } from '@ember/component/helper';

export function isStepExecuted([status]) {

  if (status) {
    switch (status) {
      case "SUCCEEDED":
      return true;

      case "FAILED":
      return true;

      case "SKIPPED":
      return false;
    }
  }
  
  return false;
}

export default helper(isStepExecuted);
