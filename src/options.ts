import * as $ from 'jquery';
import {DEFAULT_OPTS, OptionsModel} from './options.model';

// Saves options to chrome.storage.sync.
function saveOptions(opts: OptionsModel) {
  chrome.storage.sync.set(opts, () => {
    // Update status to let user know options were saved.
    const $status = $('#status');
    $status.text('Options saved.');
    setTimeout(() => {
      $status.text('');
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function loadOptions() {
  chrome.storage.sync.get({
    words: DEFAULT_OPTS.words,
    btnTxt: DEFAULT_OPTS.btnTxt,
  }, ({words, btnTxt}: OptionsModel) => {
    console.log('Fußball');
    console.log(words);
    $('#words').val(words);
    $('#btnTxt').val(btnTxt);
  });
}

function restoreDefaults() {
  saveOptions(DEFAULT_OPTS);
  loadOptions();
}

$('#save').click(() => {
  const words = $('#words').val().toString();
  const buttonText = $('#btnTxt').val().toString();
  saveOptions({words, btnTxt: buttonText});
});
$('#restore-defaults').click(restoreDefaults);
$(loadOptions); // document.addEventListener('DOMContentLoaded', restore_options);

