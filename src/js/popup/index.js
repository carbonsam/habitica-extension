/*global
chrome
*/

import makeApiRequest from '~/util/makeApiRequest';

const appData = {
  pageStatus: ''
};

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
  const userElements = {
    image: document.getElementById('hero_img'),
    health_bar: document.getElementById('hero_health_bar'),
    health_value: document.getElementById('hero_health_txt'),
    exp_bar: document.getElementById('hero_experience_bar'),
    exp_value: document.getElementById('hero_experience_txt'),
    gold_value: document.getElementById('hero_gold_txt')
  };
  const statusElements = {
    wrapper: document.getElementById('status'),
    text: document.getElementById('status_text')
  };

  const updateAvatar = (userId) => {
    userElements.image.src = `https://habitica.com/export/avatar-${userId}.png`;
  };
  getUserId(updateAvatar);

  const updateHealth = (currentHealth, maxHealth) => {
    userElements.health_bar.style = `width: ${currentHealth / maxHealth * 100}%`;
    userElements.health_value.innerHTML = `${Math.round(currentHealth)} / ${maxHealth}`;
  };

  const updateExperience = (currentExp, maxExp) => {
    userElements.exp_bar.max = maxExp;
    userElements.exp_bar.style = `width: ${currentExp / maxExp * 100}%`;
    userElements.exp_value.innerHTML = `${currentExp} / ${maxExp}`;
  };

  const updateGold = (currentGold) => {
    userElements.gold_value.innerHTML = 'Gold: ' + Math.round(currentGold);
  };

  if (userData) {
    updateHealth(userData.data.stats.hp, userData.data.stats.maxHealth);
    updateExperience(userData.data.stats.exp, userData.data.stats.toNextLevel);
    updateGold(userData.data.stats.gp);
  }

  if (appData) {
    if (appData.pageStatus === true) {
      statusElements.text.innerHTML = 'You are on a distracting website!';
      statusElements.wrapper.classList.remove('pending');
      statusElements.wrapper.classList.add('blacklisted');
    } else {
      statusElements.text.innerHTML = 'You are on a productive website!';
      statusElements.wrapper.classList.remove('pending');
      statusElements.wrapper.classList.add('whitelisted');
    }
  }
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.pageStatus) {
    appData.pageStatus = request.pageStatus;
    updatePopup();
  }
  return true;
});

loadOptions((items) => {
  const requestHeaders = [
    {
      header: 'x-api-user',
      value: items.user_id
    },
    {
      header: 'x-api-key',
      value: items.api_key
    }
  ];
  makeApiRequest('https://habitica.com/api/v3/user', requestHeaders, updatePopup);
});
