'use strict';
const webdriver = require('selenium-webdriver'),
      elements = require('./elements'),
      By = webdriver.By,
      until = webdriver.until;

function errLog (err) {
    console.log(err.name + ': ' + err.message)
}

let Actions  = {
    
    Click : function (driver, appName, opt_button) {
        let xpathStr = "//span[text()='" + appName + "']/.."
        let el = driver.wait(until.elementLocated(By.xpath(xpathStr)), 30000)
        driver.actions().click(el, opt_button).perform().catch(errLog)
        driver.sleep(1000)
    },

    ClickButton : function (driver, linkText, opt_button) {
        let el = driver.wait(until.elementLocated(By.linkText(linkText)), 30000)
        driver.actions().click(el, opt_button).perform().catch(errLog)
        driver.sleep(1000)
    },
}

let Steps = {

    Login : function (driver){
        // click OK in the Warning popup  
        driver.wait(until.elementLocated(elements.login.btn_OK), 1000).click().catch(err => errLog(err))

        // select Uaername/Password Login if needed.
        driver.findElement(elements.login.btn_UserLogin).click().catch(err => errLog(err))

        // input username and password, then login.
        driver.findElement(elements.login.input_Username).sendKeys('demo')
        driver.findElement(elements.login.input_Password).sendKeys('123')
        driver.findElement(elements.login.btn_Login).click()
        //driver.wait(until.elementLocated(elements.homeScreen.grid_PatSelection), 30000)
        //driver.wait(AllElementsLoaded(), 500, 'AllElementsLoaded test').catch(errLog)
    }
}

exports.Actions = Actions
exports.Steps = Steps