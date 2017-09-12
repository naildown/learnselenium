'use strict';

/**
 * Definition and settings
 */
const webdriver = require('selenium-webdriver'),
      driver = require('./lib/driver').build('cef'),
      elements = require('./lib/elements'),
      By = webdriver.By,
      until = webdriver.until,
      Key = webdriver.Key,
      script = "return document.getElementsByTagName('div').length",
      Condition = webdriver.Condition,
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
  click : function(locator, opt_button) {
    let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 50000);
    driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, click ++' + c));
    driver.wait(until.elementLocated(locator), 30000).click(opt_button).catch(errLog);
  },

  test : function test(locator, opt_button, count) {
    let preCount = count || 0
    console.log('call test, preCount = ' + preCount)
    driver.sleep(500)
    driver.executeScript(script).then(curCount => {
      console.log('find divs, curCount = ' + curCount)
      if (curCount && curCount === preCount) {
        driver.actions()
        .click(driver.findElement(locator), opt_button)
        .perform()
        .catch(errLog)
      } else {
        test(locator, opt_button, curCount)
      }
    })
  },

  doubleClick : function (locator, opt_button) {
    let loadMask = driver.wait(until.elementLocated(By.xpath("//div[text()='Loading ...']")), 30000);
    driver.wait(until.stalenessOf(loadMask)).then(c => console.log('loadMask is staleness, doubleclick ++' + c));
    let el = driver.wait(until.elementLocated(locator), 30000);
    driver.actions().doubleClick(el, opt_button).perform().catch(errLog);
  },

  input : function(locator, keys) {
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
driver.get('https://foo8.clinicomp.com/webframe/index.php/Cps')
driver.manage().window().maximize()
steps.login()
actions.test(elements.sideBar.reports)
actions.test(elements.tab.userPref)
actions.doubleClick(elements.userPref.tree_AllPrefSet)
