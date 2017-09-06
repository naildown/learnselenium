'use strict';
/*
Definition and options.
*/
const driver = require('./lib/driver'),
      EHR = require('./lib/EHR'),
      webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until,
      Key = webdriver.Key,
      Button = webdriver.Button,
      testLink = 'https://foo8.clinicomp.com/webframe/index.php/cps';

// open test link with browser
driver.get(testLink);

// login
EHR.Steps.Login(driver)

//go to Reports >> User preferences
EHR.Actions.SelectApp(driver, 'REPORTS')
EHR.Actions.SelectApp(driver, 'User Preferences')

driver.sleep(1000)
//let node_AllPreSet = driver.wait(until.elementLocated(By.xpath("//span[text()='All PreferenceSet']/..")), 5000);
EHR.Actions.Click(driver, 'All PreferenceSet')

driver.sleep(1000)
let node_PreSet_BASE = driver.wait(until.elementLocated(By.xpath("//span[text()='BASE']/..")), 30000);
driver.actions().click(node_PreSet_BASE, Button.RIGHT).perform();

driver.sleep(1000)
let menu_PreSet_ClonePreSet = driver.wait(until.elementLocated(By.xpath("//span[text()='Clone Preference Set']/..")), 30000);
driver.actions().click(menu_PreSet_ClonePreSet).perform();

driver.sleep(1000)
let btn_Clone = driver.wait(until.elementLocated(By.linkText('Clone')), 30000);
btn_Clone.getAttribute('id').then(c => console.log('01 id: ' + c))
btn_Clone.getAttribute('class').then(c => console.log('01 class: ' + c))
let input_PreSet_newSetName = driver.wait(until.elementLocated(By.id('textfield-inputEl')), 30000)
    .sendKeys('dstest0905');
btn_Clone.getAttribute('id').then(c => console.log('02 id: ' + c))
btn_Clone.getAttribute('class').then(c => console.log('02 class: ' + c))

//driver.sleep(1000)
//let btn_Clone = driver.wait(until.elementLocated(By.linkText('Clone')), 30000);
//btn_Clone.click()

driver.sleep('5000')
btn_Clone.getAttribute('id').then(c => console.log('03 id: ' + c))
btn_Clone.getAttribute('class').then(c => console.log('03 class: ' + c))
driver.quit()