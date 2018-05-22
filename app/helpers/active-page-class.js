import { helper } from '@ember/component/helper';

export function activePageClass([activePage, actualPage, ...rest]) {
  if (activePage == actualPage) {
    return "active"
  }
  return "";
}

export default helper(activePageClass);
