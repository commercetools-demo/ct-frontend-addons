import { Context, Request } from '@frontastic/extension-types';
import { getPath } from '../request';

export class CategoryRouter {
  static identifyFrom(request: Request) {
    if (getPath(request)?.match(/[^/]+(?=\/$|$)/)) {
      return true;
    }

    return false;
  }
}
