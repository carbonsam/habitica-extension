const CONNECT_FORM = document.getElementById("connect-form");
const USER_ID_FIELD = document.getElementById("user-id-text");
const USER_API_KEY_FIELD = document.getElementById("user-api-key-text");

CONNECT_FORM.addEventListener("submit", onConnectFormSubmit);

function onConnectFormSubmit() {
  let userId = USER_ID_FIELD.value;
  let userApiKey = USER_API_KEY_FIELD.value;

  chrome.storage.local.set(
    {
      user_id: userId,
      user_key: userApiKey
    },
    onSaveSuccess()
  );
}

function onSaveSuccess() {
  window.open("dashboard.html");
}
