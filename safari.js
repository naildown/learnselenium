'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver')
      test = require('selenium-webdriver/testing')
      driver = require('./lib/driver').build('safari'),
      elements = require('./lib/elements'),

// Define common tools
function errLog(err) {
    console.error(err.name + ' : ' + err.message);
}

// Define basic steps.
let steps = {
  login : function (username, password){
    // click OK in the Warning popup  
    driver.wait(until.elementLocated(elements.login.btn_OK), 1000).click().catch(err => errLog(err))
    // select Uaername/Password Login if needed.
    driver.findElement(elements.login.btn_UserLogin).click().catch(err => errLog(err))
    // input username and password, then login.
    driver.findElement(elements.login.input_Username).sendKeys(username)
    driver.findElement(elements.login.input_Password).sendKeys(password)
    driver.findElement(elements.login.btn_Login).click()
  }
}

/**
 * Add test cases and run test
 */

// add test cases
let cases = [
  function LoginFailed() {
    driver.get('https://foo8.clinicomp.com/webframe/index.php/Cps')
    steps.login('asdfas', '1241234')
    driver.wait(until.elementLocated(By.xpath("//span[text()='Logon Failed']")))
      .getText().then()

  },

  function LoginSuccessed() {

  }
]

// Run test