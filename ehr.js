'use strict';

/**
 * Definition and settings
 */
const webdriver = require('selenium-webdriver'),
      driver = require('./lib/driver').build('chrome'),
      elements = require('./lib/elements'),
      By = webdriver.By,
      until = webdriver.until,
      Key = webdriver.Key,
      Button = webdriver.Button;

/**
 * Define common tools
 */
function errLog(err) {
    console.error(err.name + ' : ' + err.message);
}

/**
 * Define the basic actions
 */
let actions = {
  click : function (locator, opt_button) {
    let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 50000);
    driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, click ++' + c));
    driver.wait(until.elementLocated(locator), 30000).click(opt_button).catch(errLog);
  },

  doubleClick : function (locator, opt_button) {
    let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 30000);
    driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, doubleclick ++' + c));
    let el = driver.wait(until.elementLocated(locator), 30000);
    driver.actions().doubleClick(el, opt_button).perform().catch(errLog);
  },

  input : function (locator, keys) {
    let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 30000);
    driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, input ++' + c));
    driver.wait(until.elementLocated(locator), 30000).sendKeys(keys).catch(errLog);
  }
}

/**
 * define some generic steps
 */
let steps = {
  login : function (){
    // click OK in the Warning popup  
    driver.wait(until.elementLocated(elements.login.btn_OK), 1000).click().catch(err => errLog(err))
    // select Uaername/Password Login if needed.
    driver.findElement(elements.login.btn_UserLogin).click().catch(err => errLog(err))
    // input username and password, then login.
    driver.findElement(elements.login.input_Username).sendKeys('demo')
    driver.findElement(elements.login.input_Password).sendKeys('123')
    driver.findElement(elements.login.btn_Login).click()
  }
}

/**
 * Run test
 */
driver.get('https://foo3.clinicomp.com/webframe/index.php/Cps')
driver.manage().window().maximize()
steps.login()
actions.click(elements.sideBar.reports)
actions.click(elements.userPreferences.tab)
actions.doubleClick(elements.userPreferences.treeNode.allPreferenceSet)
actions.click(elements.userPreferences.treeNode.base, Button.RIGHT)