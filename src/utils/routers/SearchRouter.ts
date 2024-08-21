import { Context, Request } from '@frontastic/extension-types';
import { getPath } from '../request';

export class SearchRouter {
  static identifyFrom(request: Request) {
    const urlMatches = getPath(request)?.match(/^\/search/);

    if (urlMatches) {
      return true;
    }

    return false;
  }
}
