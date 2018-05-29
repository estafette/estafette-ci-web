import { helper } from '@ember/component/helper';

export function buildStepClass(step) {

  if (step) {
    switch (step[0].status) {
      case "SUCCEEDED":
        return "btn-outline-success text-success";
      break;

      case "FAILED":
      return "btn-outline-danger text-danger";
      break;

      case "SKIPPED":
      return "btn-outline-secondary text-secondary";
      break;
    }
  }
  
  return "";
}

export default helper(buildStepClass);
