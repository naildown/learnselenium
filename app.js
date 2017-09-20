'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver'),
      driver = require('./lib/driver').build('chrome'),
      elements = require('./lib/elements'),
      test = require('selenium-webdriver/testing');

const chai = require('chai'),
      expect = chai.expect,
      should = chai.should(),
      assert = chai.assert;

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
test.describe('Logon', function() {

  test.after(function (done) {
    driver.quit(done())
  })

  test.it('Logon should failed', function() {
    driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
    steps.login('afsad', '123123')
    driver.wait(until.elementsLocated(elements.login.dlg_LogonFailed), 5000)
      .should.be.fulfilled
  })

  test.it('Logon should successed', function() {
    driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
    steps.login('dstest', '123')
    driver.wait(until.urlIs('https://foo3.clinicomp.com/webframe/index.php/cps'), 30000)
  })

  test.it('test03', function() {
    assert.equal(-1, [1,2,3].indexOf(4))
  })
})