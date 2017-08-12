/*global
chrome
*/

const loadOptions = (callback) => {
  chrome.storage.local.get({
    'user_id': '',
    'api_key': ''
  }, (items) => {
    callback(items);
  });
};

const getUserId = (callback) => {
  chrome.storage.local.get({
    'user_id': '',
    'api_key': ''
  }, (items) => {
    callback(items.user_id);
  });
};

const updatePopup = (userData) => {
  const userImgElement = document.getElementById('hero_img');
  const userHealthBarElement = document.getElementById('hero_health_bar');
  const userHealthValueElement = document.getElementById('hero_health_txt');
  const userExpBarElement = document.getElementById('hero_experience_bar');
  const userExpValueElement = document.getElementById('hero_experience_txt');
  const userGoldValueElement = document.getElementById('hero_gold_txt');

  const updateAvatar = (userId) => {
    userImgElement.src = 'https://habitica.com/export/avatar-' + userId + '.png';
  };
  getUserId(updateAvatar);

  if (userData) {
    userHealthBarElement.value = userData.data.stats.hp;
    userHealthValueElement.innerHTML = Math.round(userData.data.stats.hp) + ' / ' + userData.data.stats.maxHealth;

    userExpBarElement.max = userData.data.stats.toNextLevel;
    userExpBarElement.value = userData.data.stats.exp;
    userExpValueElement.innerHTML = userData.data.stats.exp + ' / ' + userData.data.stats.toNextLevel;

    userGoldValueElement.innerHTML = 'Gold: ' + Math.round(userData.data.stats.gp);
  }
};

const makeApiRequest = (url, headers = []) => {
  var xhr = new XMLHttpRequest();

  if ('withCredentials' in xhr) {
    xhr.open('GET', url, true);
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
};

loadOptions((items) => {
  let requestHeaders = [
    {
      header: 'x-api-user',
      value: items.user_id
    },
    {
      header: 'x-api-key',
      value: items.api_key
    }
  ];
  makeApiRequest('https://habitica.com/api/v3/user', requestHeaders);
});
