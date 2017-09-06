'use strict';
const webdriver = require('selenium-webdriver'),
      By = webdriver.By;

let login = {}
exports.login = login
login.btn_OK = By.linkText('OK')
login.btn_UserLogin=By.linkText('Username/Password Login')
login.input_Username = By.name('username')
login.input_Password = By.name('password')
login.btn_Login = By.linkText('Login')

let homeScreen = {}
exports.homeScreen = homeScreen
homeScreen.grid_PatSelection = By.className('x-panel-body x-grid-with-row-lines x-grid-body x-panel-body-default x-layout-fit x-panel-body-default x-noborder-rl')