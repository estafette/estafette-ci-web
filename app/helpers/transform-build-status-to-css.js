import { helper } from '@ember/component/helper';

export function transformBuildStatusToCss([value]) {
  if (value == "succeeded") {
    return "success"
  }
  if (value == "running") {
    return "warning"
  }
  if (value == "failed") {
    return "danger"
  }
  return "light";
}

export default helper(transformBuildStatusToCss);
