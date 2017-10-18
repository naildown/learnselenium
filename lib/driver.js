'use strict';
const webdriver = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      logging = webdriver.logging,
      serverURL="http://10.2.1.158:4444/wd/hub",
      cefPath = 'C:\\Program Files\\CCI\\Essentris\\Essentris1.6.0002.0000.0172\\CliniCompEHR\\cef.exe',
      cefOptions = new chrome.Options().setChromeBinaryPath(cefPath);

// add log and set log level
logging.installConsoleHandler();
logging.getLogger('webdriver.http').setLevel(logging.Level.WARNING);

function build (browser) {
  if (browser === 'cef' || '') {
    return new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(cefOptions)
    .build();
  } else {
    return new webdriver.Builder()
    .forBrowser(browser)
    .usingServer(serverURL)
    .build();
  }
}

module.exports = {
  build : build
};