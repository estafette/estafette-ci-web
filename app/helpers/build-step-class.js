import { helper } from '@ember/component/helper';

export function buildStepClass([status]) {

  if (status) {
    switch (status) {
      case "SUCCEEDED":
      return "badge-success";

      case "FAILED":
      return "badge-danger";

      case "SKIPPED":
      return "badge-secondary";
    }
  }
  
  return "";
}

export default helper(buildStepClass);
