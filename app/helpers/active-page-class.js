import { helper } from '@ember/component/helper';

export function activePageClass([activePage, actualPage]) {
  if (activePage == actualPage) {
    return "active"
  }
  return "";
}

export default helper(activePageClass);
