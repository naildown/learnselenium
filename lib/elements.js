'use strict';
const webdriver = require('selenium-webdriver'),
      By = webdriver.By;

/**
 * Login page 
 */
let login = {}
exports.login = login
login.btn_OK = By.linkText('OK')
login.btn_UserLogin=By.linkText('Username/Password Login')
login.input_Username = By.name('username')
login.input_Password = By.name('password')
login.btn_Login = By.linkText('Login')

/**
 * Patient Control
 */
let patCtrl = {}
exports.patCtrl = patCtrl
patCtrl.grid_PatSele = By.className('x-panel-body x-grid-with-row-lines x-grid-body x-panel-body-default x-layout-fit x-panel-body-default x-noborder-rl')

/**
 * Side Bar
 */
let sideBar = {}
exports.sideBar = sideBar
sideBar.reports = By.xpath("//span[text()='REPORTS']/..")
let tab = {}
exports.tab = tab
tab.userPref = By.xpath("//span[text()='User Preferences']")

/**
 * Reports (Daily Report)
 */
let reports = {}
exports.reports = reports

/**
 * User Preferences
 */
let userPref = {}
exports.userPref =userPref 
// Preferences tree
userPref.tree_AllPrefSet = By.xpath("//span[text()='All PreferenceSet']")
userPref.tree_Base = By.xpath("//span[text()='BASE']")
// Context menu in Preferences tree
userPref.menu_ClonePrefSet = By.xpath("//span[text()='Clone Preference Set']")
