var home = require('../Pages/home.page.js');
var topnav = require('../Pages/topnav.page.js');
var self = require('../Pages/my.page.js');
var testData = require('../TestData/data.json');

var pgp = require('pg-promise')(/options/);
var connectionString = require('../TestData/dbConnection.js');
var queries = require('../TestData/queries.js');

var EC = protractor.ExpectedConditions;

describe('Login with DB connection', () => {
    
    var db = pgp(connectionString);
    var arr = [];
    var username = '';
    var pass = '';

    it('Test Case 8 - Should do back end testing to login multiple users', () => {
        db.any(queries.q3)
            .then(function(result){
                arr = result;
                console.log(arr, arr.length);
            }).catch(function(error){
                console.log(error);
            }).then(function(){
                //All UI automation code
                //elementAsRow = 1 row of data (object) fetched from a database. Includes firstname, lastname, etc)
                arr.forEach(function(elementAsRow) { 
                    //fetch info to login
                    username = elementAsRow.email;
                    pass = elementAsRow.firstname.toLowerCase()+elementAsRow.lastname.toLowerCase();
                    
                    //navigate to page
                    browser.get("https://cybertek-reservation-qa.herokuapp.com/");
                    
                    //sign in to page
                    home.email.sendKeys(username);
                    home.password.sendKeys(pass);
                    home.signinButton.click();
                    browser.wait(EC.presenceOf(home.vaTitle),10000);

                    //navigate to self page and check info
                    browser.actions().mouseMove(topnav.my).perform();
                    browser.wait(EC.visibilityOf(topnav.self),10000);
                    topnav.self.click();
                    browser.wait(EC.presenceOf(self.updatePassTitle),10000);

                    //verify info in page
                    expect(self.selfName.getText()).toBe(elementAsRow.firstname + " " + elementAsRow.lastname);
                    expect(self.role.getText()).toBe(elementAsRow.role);
                    expect(self.team.getText()).toBe(elementAsRow.teamname);
                    expect(self.batch.getText()).toBe("#"+elementAsRow.batch_number);
                    expect(self.campus.getText()).toBe(elementAsRow.location);
                    // expect(self.side.getText()).toBe(elementAsRow.side);
                    
                    //sign out
                    browser.actions().mouseMove(topnav.my).perform();
                    browser.wait(EC.visibilityOf(topnav.signOut),10000)
                    topnav.signOut.click();
                })
            })
    });
});