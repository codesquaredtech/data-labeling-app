const functions = require("firebase-functions");
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.userAdded = functions.auth.user().onCreate(async user => {
    try{
        const userDTO = {    
            email: user.email,
            uuid: user.uid.toString()
        };
        await axios.post("http://478f-77-46-228-187.ngrok.io/user/auth-trigger", userDTO);
        console.log(`${user.email} is created ... `);
    }catch(err){
        console.log("Error je " + err);
    }

});


exports.userDeleted= functions.auth.user().onDelete(user => {
    console.log(`${user.email} is deleted ... `);
    return Promise.resolve();
});