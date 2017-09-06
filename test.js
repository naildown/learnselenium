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
      testLink = 'https://foo3.clinicomp.com/webframe/index.php/cps';

// open test link with browser
driver.get(testLink);

// login
EHR.Steps.Login(driver)
//driver.executeScript("alert('hello world');")

//go to Reports >> User preferences
EHR.Actions.Click(driver, 'REPORTS')
EHR.Actions.Click(driver, 'User Preferences')
EHR.Actions.Click(driver, 'All PreferenceSet')

//let node_AllPreSet = driver.wait(until.elementLocated(By.xpath("//span[text()='All PreferenceSet']/..")), 5000);