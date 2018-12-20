exports.config ={

	//JUST MODIFY
    framework:'jasmine',
    directConnect:true,
    specs:['dbtest.js'],
    jasmineNodeOpts:{
       defaultTimeoutInterval:50000
   }
 }