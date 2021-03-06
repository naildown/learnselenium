'use strict';

/**
 * Definition and settings
 */
const {By, until, Key, Button} = require('selenium-webdriver'),
    driver = require('./lib/driver').build('cef'),
    elements = require('./lib/elements'),
    assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require("chai-as-promised");
        
chai.use(chaiAsPromised);
let expect = chai.expect,
    should = chai.should();

// Define common tools
function errLog(err) {
    //console.error(err.name + ' : ' + err.message)
}

// Define basic steps.
let steps = {
    Login : function(username, password) {
        // click OK in the Warning popup    
        driver.wait(until.elementLocated(elements.login.btn_warningOK), 1000).click().catch(errLog);
        // select Uaername/Password Login if needed.
        driver.findElement(elements.login.btn_UserLogin).click().catch(errLog);
        // input username and password, then login.
        driver.findElement(elements.login.input_Username).sendKeys(username);
        driver.findElement(elements.login.input_Password).sendKeys(password);
        driver.wait(until.elementLocated(elements.login.btn_Login), 1000).click().catch(errLog);
    },

    Validate: function(authPromptType, password) {
        if(authPromptType != 0 && authPromptType != 1) {
            console.log('authPromptType: ' + authPromptType);
            throw new Error('authPompt type is error');
        } else if(authPromptType === 0) {
            driver.wait(until.elementLocated(elements.validation.input_Password),2000).sendKeys(password);
        }
        driver.wait(until.elementLocated(elements.validation.btn_OK), 3000).click();
    },

    SelectUnit : function(unitName) {
        let xp = "//tr[starts-with(@data-qtip,'" + unitName + "')]";
        driver.wait(until.elementLocated(By.xpath(xp)), 10000).click().catch(errLog);
    },

    AdmitPat : function(mrn, lastName, firstName, billing) {
        driver.wait(until.elementLocated(elements.patCtrl.icon_Adt), 5000).click().catch(errLog);
        driver.wait(until.elementLocated(elements.patCtrl.menu_Admit), 1000).click().catch(errLog);
        driver.wait(until.elementLocated(elements.patCtrl.admit_input('FMP')), 3000).sendKeys(mrn).catch(errLog);
        driver.findElement(elements.patCtrl.admit_input('Pat Last Name')).sendKeys(lastName).catch(errLog);
        driver.findElement(elements.patCtrl.admit_input('Pat First Name')).sendKeys(firstName).catch(errLog);
        driver.findElement(elements.patCtrl.admit_input('Billing Num')).sendKeys(billing).catch(errLog);
        driver.wait(until.elementLocated(elements.patCtrl.btn_Admit), 3000).click().catch(errLog);
    },
}

/**
 * Add test cases and run test
 */
describe('Test 01', function() {
    this.timeout(0)
    let testLink = 'https://foo6.clinicomp.com/webframe/index.php/Cps';

    before(function() {
        return driver.get(testLink);
    })

    beforeEach(function() {
        return driver.navigate().refresh();
    })

    after(function() {
        return driver.quit();
    })

    it('Login with incorrect password.', function() {
        steps.Login('dstest', '123123123');
        return driver.wait(until.elementsLocated(elements.login.dlg_LogonFailed), 5000)
            .should.be.fulfilled;
    })

    it('Login with correct password.', function() {
        steps.Login('demo', '123');
        return driver.wait(until.urlIs(testLink), 15000)
            .should.be.fulfilled;
    })

    it('Admit a new patient.', function() {
        driver.wait(until.elementLocated(elements.patCtrl.grid_PatSelection));
        steps.SelectUnit('MSI');
        steps.AdmitPat('dstest0925a', 'dstest', '0925a', 'dstest0925a');
        steps.Validate(0, '123');
        driver.wait(until.elementLocated(elements.prompt.lbl_AdmitOK), 5000)
            .should.be.fulfilled;
        driver.findElement(elements.prompt.btn_AdmitOK).click().catch(errLog);
        return driver.wait(until.elementsLocated(elements.patCtrl.grid_Focused('dstest, 0925a')), 10000)
            .should.be.fulfilled;
    })
})