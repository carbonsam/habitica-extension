const API_KEY = "XXXXXXXXXXXXXXXXXXXX";
const USER_ID = "XXXXXXXXXXXXXXXXXXXX";

const USER_IMG_ELEMENT = document.getElementById("user-image");


function updatePopup(userData) {
  USER_IMG_ELEMENT.src = "https://habitica.com/export/avatar-:" + USER_ID + ".png";
}

function createApiRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  }
  return xhr;
}

function makeApiRequest(url) {
  var xhr = createApiRequest("GET", "https://allow-any-origin.appspot.com/https://habitica.com/api/v3/user?key=" + API_KEY + "&user=" + USER_ID);

  xhr.onload = function() {
    window.testData = JSON.parse(xhr.responseText);
    updatePopup(JSON.parse(xhr.responseText));
  };

  xhr.onerror = function() {};

  xhr.send();
}

makeApiRequest();
