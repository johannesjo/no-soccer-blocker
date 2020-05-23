import {EV} from './ev';
import {IS_DEV} from './cfg';

export function setBadgeCount(nr: number) {
  chrome.runtime.sendMessage({
    action: EV.UPDATE_BADGE,
    source: nr
  }, (r) => {
    if(IS_DEV) {
      console.log(r);
    }
  });
}
