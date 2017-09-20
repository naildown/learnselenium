'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver'),
      driver = require('./lib/driver').build('safari'),
      elements = require('./lib/elements'),
      assert = require('assert');

// Define common tools
function errLog(err) {
    console.error(err.name + ' : ' + err.message);
}

/**
 * Add test cases and run test
 */
describe('Logon', function() {
  this.timeout(0);

  it('Case 01', function() {
    return driver.get('https://foo3.clinicomp.com/webframe/index.php/logon?ctrl=Cps')
    //driver.wait(until.elementsLocated(elements.login.btn_Login), 5000)
      .then(function(o) {
        assert(!o)
      })
  })

  it('Case 02', function() {
    var promise = Promise.resolve(1);
    return promise.then(function (value) {
      assert(value === 1);
    });
  })
})