describe('Cybertec online Banking', ()=>{
    it('should verify New customer Page', ()=>{
        browser.waitForAngularEnabled(false);
        browser.get('http://demo.guru99.com/V4/manager/Managerhomepage.php');
        browser.manage().window().maximize();
        element(by.partialLinkText('New Cust')).click();
        browser.sleep(1000);
        element(by.className('heading3')).getText().then(function(result){
            if(result=="Add New Customer"){
                console.log("Passed");
            }else{
                console.log("Not passed");
            }
          
        })
        browser.sleep(2000);
    });
    it('should verify Name field', ()=>{
        browser.waitForAngularEnabled(false);
        browser.get('http://demo.guru99.com/V4/manager/Managerhomepage.php');
        browser.manage().window().maximize();
        element(by.linkText('New Customer')).click();
        browser.sleep(1000);
        element(by.xpath("//input[@name='name']")).sendKeys('Ajay');
        browser.sleep(2000);
        element(by.id('message')).getText().then(function(result){
            if(result!="Customer name must not be blank"){
                console.log("Passed");
            }else{
                console.log("Not passed");
            }
          
        })
        browser.sleep(2000);
    })
})