import { helper } from '@ember/component/helper';

export function expandedByStatus([status]) {
  if (status) {
    switch (status) {
      case "SUCCEEDED":
      return false;

      case "FAILED":
      return true;

      case "SKIPPED":
      return false;
    }
  }
  
  return false;
}

export default helper(expandedByStatus);
