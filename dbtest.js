describe('Amazon Database Testing',function(){

    var pgp = require('pg-promise')(/*options*/);
 
    var cn={
        host:'localhost',
        port:5432,
        database:'dvdrental',
        user:'postgres',
        password:'abc'
    };
 
    var db =pgp(cn);
 
    var arr=[];
 
 
        it("should get the film names from database and seach in amazon.com",function(){
            browser.waitForAngularEnabled(false);
            browser.get("https://www.amazon.com");//navigates to website
 
 
            db.any(`SELECT title FROM film WHERE title LIKE 'O%';`)
                .then(result=>{
                    arr=result;
 
                })
                .catch(error =>{
                    console.log(error);//priting the error
                }).then(()=>{
                    arr.forEach(function(i){
                        element(by.id(id="twotabsearchtextbox")).sendKeys(i.title);
                        browser.sleep(2000);
                        element(by.css("#nav-search > form > div.nav-right > div > input")).click();
                        browser.sleep(2000);
                        browser.navigate().back();
                    });
 
                    //Front-end automation code here
 
 
                })//end of db
 
 
 
        })//end of it
 })