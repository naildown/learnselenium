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
      script = "return document.getElementsByTagName('div').length",
      Condition = webdriver.Condition,
      Button = webdriver.Button;

const waitTime = 500;

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

  click : function click(locator, opt_button, count) {
    let preCount = count || 0
    console.log('call test, preCount = ' + preCount)
    driver.sleep(waitTime)
    driver.executeScript(script).then(curCount => {
      console.log('find divs, curCount = ' + curCount)
      if (curCount && curCount === preCount) {
        driver.actions()
        .click(driver.wait(until.elementLocated(locator), 30000), opt_button)
        .perform()
        .catch(errLog)
      } else {
        click(locator, opt_button, curCount)
      }
    })
  },

  doubleClick : function doubleClick(locator, opt_button, count) {
    let preCount = count || 0
    console.log('call test, preCount = ' + preCount)
    driver.sleep(waitTime)
    driver.executeScript(script).then(curCount => {
      console.log('find divs, curCount = ' + curCount)
      if (curCount && curCount === preCount) {
        driver.actions()
        .doubleClick(driver.wait(until.elementLocated(locator), 30000), opt_button)
        .perform()
        .catch(errLog)
      } else {
        doubleClick(locator, opt_button, curCount)
      }
    })
  },

  sendKeys : function sendKeys(locator, keys, count) {
    let preCount = count || 0
    driver.sleep(waitTime)
    driver.executeScript(script).then(curCount => {
      console.log('preCount = %d, curCount = %d.', preCount, curCount)
      if (curCount && curCount === preCount) {
        driver.wait(until.elementLocated(locator), 30000).sendKeys(keys).catch(errLog)
      } else {
        sendKeys(locator, keys, curCount)
      }
    })
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
    driver.wait(until.elementLocated(elements.patCtrl.grid_PatSele), 50000)
  },

  login1 : function (){
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
actions.click(elements.sideBar.reports)
actions.click(elements.tab.userPref)
actions.doubleClick(elements.userPref.tree_AllPrefSet)
actions.click(elements.userPref.tree_Base, Button.RIGHT)
actions.click(elements.userPref.menu_ClonePrefSet)
actions.sendKeys(elements.userPref.input_NewPrefName, 'test02')
actions.click(elements.userPref.btn_Clone)
actions.click(elements.userPref.menu_Restore)
actions.click(elements.userPref.btn_OK)
actions.click(elements.userPref.tree_test02, Button.RIGHT)
actions.click(elements.userPref.menu_Delete)
actions.click(elements.userPref.btn_OK)
