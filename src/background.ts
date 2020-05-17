// function polling() {
//   console.log('polling');
//   setTimeout(polling, 1000 * 30);
// }
//
// polling();


import {EV} from './ev';

chrome.runtime.onMessage.addListener((request) => {
  console.log(request);
  if(request && request.action === EV.UPDATE_BADGE) {
    const text = (+request.source).toString();
    chrome.browserAction.setBadgeText({text});
  }

});
