const cefPath = 'C:\\Program Files\\CCI\\Essentris\\Essentris1.6.0002.0000.0168\\CliniCompEHR\\cef.exe';
const testLink = 'https://foo3.clinicomp.com/webframe/index.php/cps';

let webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until;

let cefOptions = new chrome.Options()
    .setChromeBinaryPath(cefPath);

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(cefOptions)
    .build();

let errlog = function(err) {
    console.log(err.name + ': ' + err.message)
}

// open test link with browser
driver.get(testLink);

// click OK in the Warning popup if existant
driver.findElement(By.linkText('OK')).click().catch(err => errlog(err));

// select Uaername/Password Login if needed.
driver.findElement(By.linkText('Username/Password Login')).click().catch(err => errlog(err));

// login
driver.findElement(By.name('username')).sendKeys('demo')
driver.findElement(By.name('password')).sendKeys('123')
driver.findElement(By.linkText('Login')).click()

// Go to Reports
//driver.wait(until.elementLocated(By.xpath("//span[text()='REPORTS']/..")), 30000).click().catch(err => errlog(err));
driver.wait(until.elementLocated(By.className('x-panel-body x-grid-with-row-lines x-grid-body x-panel-body-default x-layout-fit x-panel-body-default x-noborder-rl')), 30000)
    .findElement(By.xpath("//span[text()='REPORTS']/.."))
    .click()
    .catch(err => errlog(err));

//driver.sleep('5000')
driver.wait(until.elementIsEnabled(By.xpath("//span[text()='User Preferences']")), 30000)
//    .then(el => console.log('test 01: ' + el.getAttribute('id')))
//    .findElement(By.linkText('User Preferences'))
//    .then(el => console.log('test 02: ' + el.getAttribute('id')))
    .click()
    .catch(err => errlog(err));
driver.sleep('10000')
driver.quit()

until.stalenessOf