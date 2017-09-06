const cefPath = 'C:\\Program Files\\CCI\\Essentris\\' + 
                'Essentris1.6.0002.0000.0161\\CliniCompEHR\\cef.exe'

let webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until;

let cefOptions = new chrome.Options()
    .setChromeBinaryPath(cefPath)

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(cefOptions)
    .build()

driver.get('https://foo8.clinicomp.com/webframe/index.php/cps')
driver.findElement(By.id('button-1053')).click();

driver.wait(until.elementLocated(By.id('button-1036')));
driver.findElement(By.id('button-1036')).click();

driver.wait(until.elementLocated(By.name('username')));
driver.findElement(By.name('username')).sendKeys('demo');
driver.findElement(By.name('password')).sendKeys('123');

driver.wait(until.elementLocated(By.name('username')));
driver.findElement(By.linkText('Login')).click();

driver.wait(until.elementLocated(By.xpath("//*[@placeholder='Search Patient, Physician, etc']")),30000);
driver.findElement(By.xpath("//*[@placeholder='Search Patient, Physician, etc']")).sendKeys('dstest')