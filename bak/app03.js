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

// open test link with browser
driver.get(testLink);

// click OK in the Warning popup if existant
driver.findElement(By.linkText('OK')).click().catch(err => console.error(err));

// select Uaername/Password Login if needed.
driver.findElement(By.linkText('Username/Password Login')).catch(err => console.error(err));

// login
driver.findElement(By.name('username')).sendKeys('demo').catch(err => console.error(err));
driver.findElement(By.name('password')).sendKeys('123').catch(err => console.error(err));
driver.findElement(By.linkText('Login')).click().catch(err => console.error(err));

// search "dstest" after login
//driver.wait(until.elementLocated(By.xpath("//*[@placeholder='Search Patient, Physician, etc']")),10000)
//    .sendKeys('test')
//    .catch(err => console.error(err));

// Go to Reports
let reports = driver.wait(until.elementLocated(By.xpath("//span[text()='REPORTS']/..")), 10000)
//console.log('01 id: ' + reports.getAttribute('id'));
reports.getAttribute('id').then(id => console.log('02 id: ' + id))
reports.click();
//reports.click().catch(err => console.error(err));
//driver.wait(until.elementLocated(By.xpath("//span[text()='REPORTS']/..")), 10000).click().catch(err => console.error(err));
//let reports = driver.findElement(By.xpath("//span[text()='REPORTS']/.."));
//driver.wait(until.elementLocated(By.className('x-btn x-unselectable x-box-item x-toolbar-item x-btn-cps-appbtn-medium')), 5000)
//    .click()
//    .catch(err => console.error(err));

