"use strict";

var API_KEY = "0ca4036e-6ece-471a-ae34-e104aee8ddcd";
var USER_ID = "a41eb7a0-2125-4ca5-9786-4033bd4a1d5a";

var USER_IMG_ELEMENT = document.getElementById("hero_image");
var USER_HEALTH_BAR_ELEMENT = document.getElementById("hero_health_bar");
var USER_HEALTH_VALUE_ELEMENT = document.getElementById("hero_health_value");
var USER_EXPERIENCE_BAR_ELEMENT = document.getElementById("hero_experience_bar");
var USER_EXPERIENCE_VALUE_ELEMENT = document.getElementById("hero_experience_value");
var USER_GOLD_VALUE_ELEMENT = document.getElementById("hero_gold_value");
var USER_LEVEL_VALUE_ELEMENT = document.getElementById("hero_level_value");

function updatePopup(userData) {
  USER_IMG_ELEMENT.src = "https://habitica.com/export/avatar-" + USER_ID + ".png";

  USER_HEALTH_BAR_ELEMENT.style = "width: " + userData.data.stats.hp / userData.data.stats.maxHealth * 100 + "%";
  USER_HEALTH_VALUE_ELEMENT.innerHTML = Math.round(userData.data.stats.hp) + " / " + userData.data.stats.maxHealth;

  USER_EXPERIENCE_BAR_ELEMENT.style = "width: " + userData.data.stats.exp / userData.data.stats.toNextLevel * 100 + "%";
  USER_EXPERIENCE_VALUE_ELEMENT.innerHTML = userData.data.stats.exp + " / " + userData.data.stats.toNextLevel;

  USER_GOLD_VALUE_ELEMENT.innerHTML = Math.round(userData.data.stats.gp);
  USER_LEVEL_VALUE_ELEMENT.innerHTML = "Level " + userData.data.stats.lvl;

  console.log(userData);
}

function createApiRequest(method, url) {
  var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  }

  headers.forEach(function (item) {
    xhr.setRequestHeader(item.header, item.value);
  });

  return xhr;
}

function makeApiRequest(url, headers) {
  var xhr = createApiRequest("GET", url, headers);

  xhr.onload = function () {
    window.testData = JSON.parse(xhr.responseText);
    updatePopup(JSON.parse(xhr.responseText));
  };

  xhr.onerror = function () {};

  xhr.send();
}

var requestHeaders = [{
  header: "x-api-user",
  value: USER_ID
}, {
  header: "x-api-key",
  value: API_KEY
}];
makeApiRequest("https://habitica.com/api/v3/user", requestHeaders);