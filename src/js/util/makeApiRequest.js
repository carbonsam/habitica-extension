const makeApiRequest = (url, headers = [], callback) => {
  var xhr = new XMLHttpRequest();

  if ('withCredentials' in xhr) {
    xhr.open('GET', url, true);
  }

  headers.forEach(item => {
    xhr.setRequestHeader(item.header, item.value);
  });

  xhr.onload = () => {
    window.testData = JSON.parse(xhr.responseText);
    callback(JSON.parse(xhr.responseText));
  };

  xhr.onerror = () => {};

  xhr.send();
};

export default makeApiRequest;
