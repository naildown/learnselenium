'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver'),
      driver = require('./lib/driver').build('safari'),
      elements = require('./lib/elements'),
      test = require('selenium-webdriver/testing');

const assert = require('assert'),
      chai = require('chai'),
      expect = chai.expect,
      should = chai.should();

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
describe('Logon', function() {

  before(function(done) {
    driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
      .then(done())
  })
  after(function(done) {
    done()
    //driver.quit()
      //.then(done())
  })

  it('Logon should failed', function() {
    driver.navigate().refresh()
    steps.login('afsad', '123123')
    let el = driver.wait(until.elementsLocated(elements.login.dlg_LogonFailed), 5000)
    return Promise.resolve(el)
      .then(function(el) {
        assert(el)
      })
  })

  it('Logon should successed', function() {
    driver.navigate().refresh()
    driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
    steps.login('dstest', '123')
    driver.wait(until.urlIs('https://foo3.clinicomp.com/webframe/index.php/cps'), 30000)
  })

  it('test03', function() {
    var promise = Promise.resolve(1);
    return promise.then(function (value) {
        assert(value === 1);
    });
  })
})