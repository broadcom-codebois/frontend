import firebase from 'firebase'
import { useState } from 'react'

var token = null
var user = null

const firebaseConfig = {
    apiKey: "AIzaSyCuxgRJv_tfYENTjAqW6MWpeTYaLlJEXIo",
    authDomain: "testauditoriumbooking.firebaseapp.com",
    databaseURL: "https://testauditoriumbooking.firebaseio.com",
    projectId: "testauditoriumbooking",
    storageBucket: "testauditoriumbooking.appspot.com",
    messagingSenderId: "287027677291",
    appId: "1:287027677291:web:bc7bc1a8415e470ac4492e"
};

firebase.initializeApp(firebaseConfig);

export const logIntoFirebase = () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    firebase.auth().languageCode = 'cs'

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    //setLoginTitle(userData.displayName)
}