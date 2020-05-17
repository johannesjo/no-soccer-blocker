import {EV} from './ev';

export function msgBackground(data: any) {
  chrome.runtime.sendMessage({
    action: EV.UPDATE_BADGE,
    source: data
  });
}
