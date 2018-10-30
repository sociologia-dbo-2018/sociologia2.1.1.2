import {config} from './config.js';

const firebase = require('firebase');

// Initialize Firebase
firebase.initializeApp(config);

export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
