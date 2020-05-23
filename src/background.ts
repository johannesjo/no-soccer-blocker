// function polling() {
//   console.log('polling');
//   setTimeout(polling, 1000 * 30);
// }
//
// polling();


import {EV} from './ev';

let badgeText: string = null;

chrome.runtime.onMessage.addListener((request, sender, cb) => {
  console.log(request);
  if(request && request.action === EV.UPDATE_BADGE) {
    const newBadgeText = (+request.source).toString();
    if(badgeText !== newBadgeText) {
      badgeText = newBadgeText;
      chrome.browserAction.setBadgeText({text: badgeText});
    }
  }
  if(cb) {
    cb();
  }

  // required to make error go away
  return true;
});
