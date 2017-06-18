const USER_ID_ELEMENT = document.getElementById('user_id_txt');
const API_KEY_ELEMENT = document.getElementById('api_key_txt');
const SAVE_BTN_ELEMENT = document.getElementById('options_save_btn');
const CLEAR_BTN_ELEMENT = document.getElementById('options_clear_btn');
const STATUS_TXT_ELEMENT = document.getElementById('options_status_txt');

function saveOptions() {
  const USER_ID = USER_ID_ELEMENT.value;
  const API_KEY = API_KEY_ELEMENT.value;

  chrome.storage.local.set({
    "user_id": USER_ID,
    "api_key": API_KEY
  }, function() {
    STATUS_TXT_ELEMENT.textContent = 'Options saved successfully.';
    setTimeout(function() {
      STATUS_TXT_ELEMENT.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.local.get({
    "user_id": '',
    "api_key": ''
  }, function(items) {
    USER_ID_ELEMENT.value = items.user_id;
    API_KEY_ELEMENT.value = items.api_key;
  });
}

function clearOptions() {
  chrome.storage.local.set({
    "user_id": '',
    "api_key": ''
  }, function(items) {
    STATUS_TXT_ELEMENT.textContent = 'Options cleared successfully.';
    setTimeout(function() {
      STATUS_TXT_ELEMENT.textContent = '';
    }, 750);
    restoreOptions();
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
SAVE_BTN_ELEMENT.addEventListener('click', saveOptions);
CLEAR_BTN_ELEMENT.addEventListener('click', clearOptions);
