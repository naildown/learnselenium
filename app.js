'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver'),
      driver = require('./lib/driver').build('cef'),
      elements = require('./lib/elements'),
      assert = require('assert'),
      chai = require('chai'),
      chaiAsPromised = require("chai-as-promised")
    
chai.use(chaiAsPromised);
let expect = chai.expect,
    should = chai.should();

// Define common tools
function errLog(err) {
    //console.error(err.name + ' : ' + err.message);
    console.error(err.name);
}

// Define basic steps.
let steps = {
  login : function (username, password){
    // click OK in the Warning popup  
    driver.wait(until.elementLocated(elements.login.btn_OK), 1000).click().catch(errLog)
    // select Uaername/Password Login if needed.
    driver.findElement(elements.login.btn_UserLogin).click().catch(errLog)
    // input username and password, then login.
    driver.findElement(elements.login.input_Username).sendKeys(username)
    driver.findElement(elements.login.input_Password).sendKeys(password)
    driver.wait(until.elementLocated(elements.login.btn_Login), 1000).click().catch(errLog)
  }
}

/**
 * Add test cases and run test
 */
describe('Logon', function() {
  this.timeout(0)

  before(function() {
    return driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
  })

  beforeEach(function() {
    //driver.manage().window().setSize(1024, 960)
    return driver.navigate().refresh()
  })
  
  after(function() {
    return driver.quit()
  })

  it(' should failed.', function() {
    steps.login('dstest', '123')
    return driver.wait(until.elementsLocated(elements.login.dlg_LogonFailed), 5000)
      .should.be.fulfilled;
  })

  it(' should successed.', function() {
    steps.login('demo', '123')
    return driver.wait(until.urlIs('https://foo3.clinicomp.com/webframe/index.php/Cps'), 15000)
      .should.be.fulfilled;
  })
})