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
    ...DEFAULT_OPTS
  }, ({words, btnTxt, isJustRemove}: OptionsModel) => {
    console.log('Fußball');
    console.log(words);
    $('#words').val(words);
    $('#btnTxt').val(btnTxt);
    $('#isJustRemove').prop('checked', isJustRemove);
  });
}

function restoreDefaults() {
  saveOptions(DEFAULT_OPTS);
  loadOptions();
}

$('#save').click(() => {
  const words = $('#words').val().toString();
  const btnTxt = $('#btnTxt').val().toString();
  const isJustRemove = $('#isJustRemove').is(':checked');
  saveOptions({words, btnTxt, isJustRemove});
});
$('#restoreDefaults').click(restoreDefaults);
$(loadOptions); // document.addEventListener('DOMContentLoaded', restore_options);

