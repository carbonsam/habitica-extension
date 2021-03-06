/*global
chrome
*/

function getSavedBlacklist() {
  return new Promise(resolve => {
    chrome.storage.local.get({
      'site_blacklist': ''
    }, (items) => {
      resolve(items.site_blacklist.split(','));
    });
  });
}

async function isSiteInBlacklist(url) {
  let response = false;
  let blacklist = await getSavedBlacklist();
  blacklist = blacklist.map(item => item.trim());

  for (let i = 0; i < blacklist.length; i++) {
    if (url.indexOf(blacklist[i]) > -1) {
      response = true;
      break;
    }
  }
  return response;
}

function handleBlacklistedSite() {
  // TODO
}

function attachEvents() {
  chrome.webNavigation.onCommitted.addListener((event) => {
    isSiteInBlacklist(event.url).then(response => {
      if (response) {
        handleBlacklistedSite();
      }
      //console.log((response) ? 'This site is blacklisted' : 'This site is not blacklisted');
    });
  });
}

attachEvents();
