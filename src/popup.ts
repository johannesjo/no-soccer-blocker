import * as moment from 'moment';
import * as $ from 'jquery';

let count = 0;
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {
      isToggle: true
    },
    function (msg) {
      console.log("result message:", msg);
    });
});

$(function () {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    $('#url').text(tabs[0].url);
    $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
  });

  $('#magic').click(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
          isToggle: true
        },
        function (msg) {
          console.log("result message:", msg);
        });
    });
  });
});
