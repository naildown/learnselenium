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
let patientControl = {}
exports.patientControl = patientControl
patientControl.grid_PatSelection = By.className('x-panel-body x-grid-with-row-lines x-grid-body x-panel-body-default x-layout-fit x-panel-body-default x-noborder-rl')

/**
 * Side Bar
 */
let sideBar = {}
exports.sideBar = sideBar
sideBar.reports = By.xpath("//span[text()='REPORTS']/..")

/**
 * Reports (Daily Report)
 */
let reports = {}
exports.reports = reports

/**
 * User Preferences
 */
let userPreferences = {}
exports.userPreferences = userPreferences
userPreferences.tab = By.xpath("//span[text()='User Preferences']")
// Preferences tree
userPreferences.treeNode = {}
userPreferences.treeNode.allPreferenceSet = By.xpath("//span[text()='All PreferenceSet']")
userPreferences.treeNode.base = By.xpath("//span[text()='BASE']")
// Context menu in Preferences tree
userPreferences.contextMenu = {}
userPreferences.contextMenu.clonePreferenceSet = By.xpath("//span[text()='Clone Preference Set']")
