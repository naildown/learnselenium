'use strict';
/*
Definition and options.
*/
const cefPath = 'C:\\Program Files\\CCI\\Essentris\\Essentris1.6.0002.0000.0168\\CliniCompEHR\\cef.exe';

const webdriver = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      logging = webdriver.logging;

logging.installConsoleHandler();
logging.getLogger('webdriver.http').setLevel(logging.Level.WARNING);

let cefOptions = new chrome.Options()
.setChromeBinaryPath(cefPath);

module.exports = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(cefOptions)
  .build();