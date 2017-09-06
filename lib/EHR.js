'use strict';
const webdriver = require('selenium-webdriver'),
      elements = require('./elements'),
      By = webdriver.By,
      until = webdriver.until;

function ClickWhenAble (driver, condition, count) {
    let i = count + 1 || 1
    if ( i > 10 ) {
        console.log('Too many attampts to click the element ' + condition + ', abort.')
        return
    }
    driver.wait(until.elementLocated(condition), 10000) .click() .catch(function(err) {
        if (err.message.indexOf('is not clickable at point') >= 0) {
            console.log('The element ' + condition + ' is not clickable, try again after 500 milliseconds.')
            driver.sleep(500)
            ClickWhenAble(condition, i)
        }
        else {
            errlog(err)
            return
        }
    })
}

function errLog (err) {
    //console.log(err.name + ': ' + err.message)
}

function AllElementsLoaded(count) {
    console.log('call AllElementsLoaded. in count1: ' + count)
    var prevCount = 55
    return new webdriver.Condition('for all the elements are loaded', function(driver){
        console.log('in count2: ' + prevCount)
        driver.sleep(100)
        return driver.executeScript("return document.getElementsByTagName('div').length;").then(function (curCount) {
            console.log('prev: ' + prevCount + '  cur: ' + curCount)
            if (curCount === prevCount) {
                console.log('result: true')
                return true
            } else {
                AllElementsLoaded(curCount)
            }
        })
    })
}

//titleMatches = function titleMatches(regex) {
//    return new Condition('for title to match ' + regex, function(driver) {
//      return driver.getTitle().then(function(title) {
//        return regex.test(title);
//      });
//    });
//  };

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
        driver.wait(AllElementsLoaded(0), 10000, 'AllElementsLoaded test').catch(errLog)
    }
}

exports.Actions = Actions
exports.Steps = Steps