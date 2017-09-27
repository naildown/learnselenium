'use strict';
const webdriver = require('selenium-webdriver'),
      By = webdriver.By;

/**
 * Prompt
 */
let prompt = {}
exports.prompt = prompt
let promptAdmitOkPath = "//div[text()='Success']/ancestor::div[@class='x-window x-message-box x-layer x-window-default x-closable x-window-closable x-window-default-closable x-border-box']"
prompt.btn_AdmitOK = By.xpath(promptAdmitOkPath + "//span[text()='OK']")
prompt.lbl_AdmitOK = By.xpath(promptAdmitOkPath + "//div[text()='Admit OK']")

/**
 * Login page 
 */
let login = {}
let div_login_path = "//div[contains(@class,'auth-panel')]"
let div_warning_path = "//div[contains(@class, 'logon-window x-layer')]"
exports.login = login
login.btn_warningOK = By.xpath(div_warning_path + "//span[text()='OK']")
login.btn_UserLogin = By.linkText('Username/Password Login')
login.input_Username = By.name('username')
login.input_Password = By.name('password')
login.btn_Login = By.xpath(div_login_path + "//a[@class='x-btn cci-logon-btn-cls x-unselectable x-btn-default-medium']")
login.dlg_LogonFailed = By.xpath("//div[text()='Logon Failed']")

/**
 * Validation dialog
 */
let validation = {}
exports.validation = validation
let valPath = "//div[text()='Validation Dialog']/ancestor::div[@class='x-window  x-layer x-window-default x-border-box']"
validation.input_Password = By.xpath(valPath + "//input[@name='password']")
validation.btn_OK = By.xpath(valPath + "//span[text()='OK']")
validation.btn_Cancel = By.xpath(valPath + "//input[text()='password']")

/**
 * Patient Control
 */
let patCtrl = {}
exports.patCtrl = patCtrl
patCtrl.grid_PatSelection = By.xpath("//div[contains(@class, 'PatientSelectionGrid')]")
patCtrl.icon_Adt = By.xpath("//a[@style='margin: 0px; height: 30px; right: auto; left: 0px; top: 2px;']")
patCtrl.menu_Admit = By.xpath("//span[text()='Admit']/..")
let div_adt_Path = "//label[text()='Admission  Data:']/ancestor::div[@class='x-panel-body x-panel-body-default x-abs-layout-ct x-panel-body-default x-noborder-trbl']"
patCtrl.admit_input = function(fieldName) {
    let xp = div_adt_Path + "//span[text()='" + fieldName + "']/../..//input[1]"
    return By.xpath(xp)
}
patCtrl.btn_Admit = By.xpath(div_adt_Path + "//span[text()='Admit']/ancestor::a[@class='x-btn x-unselectable x-abs-layout-item x-btn-default-small']")
patCtrl.grid_Focused = function(patName) {
    let xp = "//div[starts-with(text(), '" + patName + "')]/ancestor::table[1]"
    return By.xpath(xp)
}

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
userPref.tree_Test02 = By.xpath("//span[text()='test02']")
// Context menu in Preferences tree
userPref.menu_ClonePrefSet = By.xpath("//span[text()='Clone Preference Set']")
userPref.menu_Restore = By.xpath("//span[text()='Restore Default']")
userPref.menu_Delete = By.xpath("//span[text()='Delete']")
// Buttons & inputs
userPref.input_NewPrefName = By.id('textfield-inputEl')
userPref.btn_Clone = By.xpath("//span[text()='Clone']")
userPref.btn_OK = By.xpath("//span[text()='OK']")
