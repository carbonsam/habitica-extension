let USER_ID = "";
let API_KEY = "";

const USER_IMG_ELEMENT = document.getElementById("hero_img");
const USER_HEALTH_BAR_ELEMENT = document.getElementById("hero_health_bar");
const USER_HEALTH_VALUE_ELEMENT = document.getElementById("hero_health_txt");
const USER_EXPERIENCE_BAR_ELEMENT = document.getElementById("hero_experience_bar");
const USER_EXPERIENCE_VALUE_ELEMENT = document.getElementById("hero_experience_txt");
const USER_GOLD_VALUE_ELEMENT = document.getElementById("hero_gold_txt");


function loadOptions(callback) {
  chrome.storage.local.get({
    "user_id": '',
    "api_key": ''
  }, function(items) {
    USER_ID = items.user_id;
    API_KEY = items.api_key;
    callback();
  });
}

function updatePopup(userData) {
  if (userData) {
    USER_IMG_ELEMENT.src = "https://habitica.com/export/avatar-" + USER_ID + ".png";

    USER_HEALTH_BAR_ELEMENT.value = userData.data.stats.hp;
    USER_HEALTH_VALUE_ELEMENT.innerHTML = Math.round(userData.data.stats.hp) + " / " + userData.data.stats.maxHealth;

    USER_EXPERIENCE_BAR_ELEMENT.max = userData.data.stats.toNextLevel;
    USER_EXPERIENCE_BAR_ELEMENT.value = userData.data.stats.exp;
    USER_EXPERIENCE_VALUE_ELEMENT.innerHTML = userData.data.stats.exp + " / " + userData.data.stats.toNextLevel;

    USER_GOLD_VALUE_ELEMENT.innerHTML = "Gold: " + Math.round(userData.data.stats.gp);
  }
}

function makeApiRequest(url, headers = []) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open("GET", url, true);
  }

  headers.forEach(item => {
    xhr.setRequestHeader(item.header, item.value);
  });

  xhr.onload = function() {
    window.testData = JSON.parse(xhr.responseText);
    updatePopup(JSON.parse(xhr.responseText));
  };

  xhr.onerror = function() {};

  xhr.send();
}

loadOptions(function() {
  let requestHeaders = [
    {
      header: "x-api-user",
      value: USER_ID
    },
    {
      header: "x-api-key",
      value: API_KEY
    }
  ];
  makeApiRequest("https://habitica.com/api/v3/user", requestHeaders);
});
