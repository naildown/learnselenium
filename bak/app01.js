const cefPath = 'C:\\Program Files\\CCI\\Essentris\\' + 
                'Essentris1.6.0002.0000.0168\\CliniCompEHR\\cef.exe'

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

console.log('before sleep')
driver.sleep(3000).then(console.log('after sleep'))
console.log('test')
