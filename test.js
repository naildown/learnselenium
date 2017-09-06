const cps = require('./lib/cps'),
      elements = require('./lib/elements'),
      testLink = 'https://foo3.clinicomp.com/webframe/index.php/cps';

let cps01 = new cps('cef', testLink)

// open test link with browser
cps01.actions.openUrl(testLink);

// login
EHR.Steps.Login(driver)

//go to Reports >> User preferences
EHR.actions.click(elements.sideBar.reports)
EHR.actions.click(elements.userPreferences.tab)
EHR.actions.click(elements.userPreferences.treeNode)