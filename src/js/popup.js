const API_KEY = "XXXXXXXXXXXXXXXXXXXX";
const USER_ID = "XXXXXXXXXXXXXXXXXXXX";

const USER_IMG_ELEMENT = document.getElementById("hero_image");
const USER_HEALTH_BAR_ELEMENT = document.getElementById("hero_health_bar");
const USER_HEALTH_VALUE_ELEMENT = document.getElementById("hero_health_value");
const USER_EXPERIENCE_BAR_ELEMENT = document.getElementById("hero_experience_bar");
const USER_EXPERIENCE_VALUE_ELEMENT = document.getElementById("hero_experience_value");
const USER_GOLD_VALUE_ELEMENT = document.getElementById("hero_gold_value");
const USER_LEVEL_VALUE_ELEMENT = document.getElementById("hero_level_value");


function updatePopup(userData) {
  USER_IMG_ELEMENT.src = "https://habitica.com/export/avatar-" + USER_ID + ".png";

  USER_HEALTH_BAR_ELEMENT.style = "width: " + (userData.data.stats.hp / userData.data.stats.maxHealth * 100) + "%";
  USER_HEALTH_VALUE_ELEMENT.innerHTML = Math.round(userData.data.stats.hp) + " / " + userData.data.stats.maxHealth;

  USER_EXPERIENCE_BAR_ELEMENT.style = "width: " + (userData.data.stats.exp / userData.data.stats.toNextLevel * 100) + "%";
  USER_EXPERIENCE_VALUE_ELEMENT.innerHTML = userData.data.stats.exp + " / " + userData.data.stats.toNextLevel;

  USER_GOLD_VALUE_ELEMENT.innerHTML = Math.round(userData.data.stats.gp);
  USER_LEVEL_VALUE_ELEMENT.innerHTML = "Level " + userData.data.stats.lvl;

  console.log(userData);
}

function createApiRequest(method, url, headers = []) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  }

  headers.forEach(item => {
    xhr.setRequestHeader(item.header, item.value);
  });

  return xhr;
}

function makeApiRequest(url, headers) {
  var xhr = createApiRequest("GET", url, headers);

  xhr.onload = function() {
    window.testData = JSON.parse(xhr.responseText);
    updatePopup(JSON.parse(xhr.responseText));
  };

  xhr.onerror = function() {};

  xhr.send();
}

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
