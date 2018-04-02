/* global chrome */

const USER_ID_ELEMENT = document.getElementById('user_id_txt');
const API_KEY_ELEMENT = document.getElementById('api_key_txt');
const BLACKLIST_ELEMENT = document.getElementById('site_blacklist_txt');

const SAVE_BTN_ELEMENT = document.getElementById('options_save_btn');
const CLEAR_BTN_ELEMENT = document.getElementById('options_clear_btn');
const STATUS_TXT_ELEMENT = document.getElementById('options_status_txt');

const saveOptions = () => {
  const userIdText = USER_ID_ELEMENT.value;
  const apiKeyText = API_KEY_ELEMENT.value;
  const blacklistText = BLACKLIST_ELEMENT.value;

  chrome.storage.local.set({
    'user_id': userIdText,
    'api_key': apiKeyText,
    'site_blacklist': blacklistText
  }, () => {
    STATUS_TXT_ELEMENT.textContent = 'Options saved successfully.';

    setTimeout(() => {
      STATUS_TXT_ELEMENT.textContent = '';
    }, 3000);
  });
};

const restoreOptions = () => {
  chrome.storage.local.get({
    'user_id': '',
    'api_key': '',
    'site_blacklist': ''
  }, function(items) {
    USER_ID_ELEMENT.value = items.user_id;
    API_KEY_ELEMENT.value = items.api_key;
    BLACKLIST_ELEMENT.value = items.site_blacklist;
  });
};

const clearOptions = () => {
  chrome.storage.local.set({
    'user_id': '',
    'api_key': '',
    'site_blacklist': ''
  }, () => {
    STATUS_TXT_ELEMENT.textContent = 'Options cleared successfully.';

    setTimeout(() => {
      STATUS_TXT_ELEMENT.textContent = '';
    }, 3000);

    restoreOptions();
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
SAVE_BTN_ELEMENT.addEventListener('click', saveOptions);
CLEAR_BTN_ELEMENT.addEventListener('click', clearOptions);
