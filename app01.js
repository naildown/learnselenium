let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://www.baidu.com');
driver.findElement(By.id('kw')).sendKeys('selenium');
driver.wait(until.titleIs('selenium_百度搜索'), 1000);
driver.quit();