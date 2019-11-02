require('dotenv').config();

var admin = require('firebase-admin');
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: process.env.DB_API_KEY,
  authDomain: process.env.DB_AUTH_DOMAIN,
  databaseURL: process.env.DB_DATABASE_URL,
  storageBucket: process.env.DB_STORAGE_BUCKET,
  messagingSenderId: process.env.DB_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

module.exports = firebase;
