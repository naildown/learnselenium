'use strict';

/**
 * Definition and settings
 */
const {By, until, Condition, Key, Button} = require('selenium-webdriver'),
      driver = require('./lib/driver').build('chrome'),
      elements = require('./lib/elements'),
      assert = require('assert'),
      chai = require('chai'),
      chaiAsPromised = require("chai-as-promised")
        
chai.use(chaiAsPromised)
let expect = chai.expect,
    should = chai.should()

// Define common tools
function errLog(err) {
    //console.error(err.name + ' : ' + err.message)
}

// Define basic steps.
let steps = {
    Login : function(username, password) {
        // click OK in the Warning popup    
        driver.wait(until.elementLocated(elements.login.btn_OK), 1000).click().catch(errLog)
        // select Uaername/Password Login if needed.
        driver.findElement(elements.login.btn_UserLogin).click().catch(errLog)
        // input username and password, then login.
        driver.findElement(elements.login.input_Username).sendKeys(username)
        driver.findElement(elements.login.input_Password).sendKeys(password)
        driver.sleep(100);
        driver.findElement(elements.login.btn_Login).click()
    },

    Validate: function(authPromptType, password) {
        driver.sleep(100)
        if(authPromptType !== 0 || authPromptType !== 1) {
            throw new Error('authPrompt type is error')
            return
        } else if(authPromptType === 0) {
            driver.findElement(elements.validation.input_Password).sendKeys(password)
        }
        driver.findElement(elements.validation.btn_OK).click()
    },

    SelectUnit : function(unitName) {
        let xp = "//tr[starts-with(@data-qtip,'" + unitName + "')]"
        driver.wait(until.elementLocated(By.xpath(xp)), 10000).click().catch(errLog)
        driver.sleep(2000)
    },

    AdmitPat : function(mrn, lastName, firstName, billing) {
        driver.wait(until.elementLocated(elements.patCtrl.icon_Adt), 5000).click().catch(errLog)
        driver.wait(until.elementLocated(elements.patCtrl.menu_Admit), 1000).click().catch(errLog)
        driver.sleep(1000)
        driver.findElement(elements.patCtrl.admit_input('FMP')).sendKeys(mrn).catch(errLog)
        driver.findElement(elements.patCtrl.admit_input('Pat Last Name')).sendKeys(mrn).catch(errLog)
        driver.findElement(elements.patCtrl.admit_input('Pat First Name')).sendKeys(mrn).catch(errLog)
        driver.findElement(elements.patCtrl.admit_input('Billing Num')).sendKeys(mrn).catch(errLog)
        driver.sleep(100)
        driver.findElement(elements.patCtrl.btn_Admit).click()
    },
}

/**
 * Add test cases and run test
 */
describe('Test 01', function() {
    this.timeout(0)

    before(function() {
        return driver.get('https://foo3.clinicomp.com/webframe/index.php/Cps')
    })

    after(function() {
        return driver.quit()
    })

    it('Login with incorrect password.', function() {
        steps.Login('dstest', '123')
        return driver.wait(until.elementsLocated(elements.login.dlg_LogonFailed), 5000)
            .should.be.fulfilled;
    })

    it('Login with correct password.', function() {
        steps.Login('demo', '123')
        return driver.wait(until.urlIs('https://foo3.clinicomp.com/webframe/index.php/Cps'), 15000)
            .should.be.fulfilled
    })

    it('Admit a new patient.', function() {
        steps.SelectUnit('MSI')
        steps.AdmitPat('dstest0925', 'dstest', '0925', 'dstest0925')
        steps.validation(0, '123')
        driver.wait(until.elementLocated(elements.prompt.lbl_AdmitOK), 5000).should.be.fulfilled
        driver.findElement(elements.prompt.btn_OK).click()
        return driver.wait(until.elementLocated(By.xpath("//span[text()='Cancel']")), 10000)
            .should.be.fulfilled
    })
})