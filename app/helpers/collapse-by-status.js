import { helper } from '@ember/component/helper';

export function collapseByStatus([status]) {
  if (status) {
    switch (status) {
      case "SUCCEEDED":
      return "";

      case "FAILED":
      return "show";

      case "SKIPPED":
      return "";
    }
  }
  
  return "";
}

export default helper(collapseByStatus);
