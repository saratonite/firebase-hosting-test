const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const firebase = require('firebase-admin')

const firebaseApp = firebase.initializeApp( functions.config().firebase ) 

function getQuotes() {
    const ref = firebaseApp.database().ref('qoutes')

    return ref.once('value').then( snap => snap.val())
}

const express = require('express')

const application = express()

application.get('/app', (req,res) => {

    let possibilities = [true, false];
    let _value = possibilities[Math.floor(Math.random() * possibilities.length)]

    let data = {
        luck: _value,
        timestamp: Date.now()
    }
    //

    getQuotes().then(data => {

         res.json(data)

    })
   
})

exports.app = functions.https.onRequest(application);