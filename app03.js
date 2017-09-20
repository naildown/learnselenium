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

describe('a suite of tests', function() {
  this.timeout(500);

  it('should take less than 500ms', function(done){
    this.timeout(5000);
    setTimeout(done, 3000);
  });

  it('should take less than 500ms as well', function(done){
    setTimeout(done, 250);
  });
})