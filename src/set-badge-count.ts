import {EV} from './ev';

export function setBadgeCount(nr: number) {
  chrome.runtime.sendMessage({
    action: EV.UPDATE_BADGE,
    source: nr
  });
}
