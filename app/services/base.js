import { getString, setString } from 'tns-core-modules/application-settings';

const uidKey = 'uid';
export default class BaseService {
  isLoggedIn() {
    return !!getString(uidKey);
  }

  get uid() {
    return getString(uidKey);
  }

  set uid(uid) {
    return setString(uidKey, uid);
  }
}
