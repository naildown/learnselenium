'use strict';

const webdriver = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      ie = require('selenium-webdriver/ie'),
      elements = require('./elements'),
      By = webdriver.By,
      until = webdriver.until,
      Key = webdriver.Key,
      Button = webdriver.Button,
      logging = webdriver.logging;

class Cps {
  constructor(name, path) {
    // Supported browser name: cef, chrome, ie, default is cef.
    this.browserName = name || 'cef';
    this.browserPath = path;
    this.driver = this.build();
    this.actions = this.defAction();
    this.steps = this.defSteps();
  }

  build() {
    switch(this.browser)
    {
      case 'cef':
        let cefPptions = new chrome.Options()
          .setChromeBinaryPath(browserPath);
        
        return new webdriver.Builder()
          .forBrowser('chrome')
          .setChromeOptions(cefOptions)
          .build();

        break;

      case 'chrome':
        return new webdriver.Builder()
          .forBrowser('chrome')
          .build();

        break;

      case 'ie':
        return new webdriver.Builder()
          .forBrowser('ie')
          .build();

        break;

      default:
        console.log('Browser is not supported.')
        return null
    }
  }

  errLog(err) {err => console.error(err.message)}

  defAction() {
    return {
      openUrl : function (url) {
        this.driver.get(url)
      },
      
      click : function (locator, opt_button) {

        let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 30000)
        driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, ++' + c))
        let el = driver.wait(until.elementLocated(locator), 30000)
        driver.actions().click(el, opt_button).perform().catch(errLog)
      },

      input : function(locator, keys) {
        let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 30000)
        driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, ++' + c))
        driver.wait(until.elementLocated(locator), 30000).click().catch(errLog)
      }
    
    }
  }

  defSteps() {
    return {
      Login : function (){
        // click OK in the Warning popup  
        this.actions.click(elements.login.btn_OK)
        // select Uaername/Password Login if needed.
        this.actions.click(elements.login.btn_UserLogin)
    
        // input username and password, then login.
        this.actions.input(elements.login.input_Username, 'demo')
        this.actions.input(elements.login.input_Password, '123')
        this.actions.click(elements.login.btn_Login)
      }
    }
  }
}

module.exports = Cps