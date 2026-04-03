import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {  collection, doc, setDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsWYE_dub9bDVqB_KmyAH28sk7TpKz-ro",
    authDomain: "bookmarksapp-fbf95.firebaseapp.com",
    projectId: "bookmarksapp-fbf95",
    storageBucket: "bookmarksapp-fbf95.firebasestorage.app",
    messagingSenderId: "339556120269",
    appId: "1:339556120269:web:5e42844ec1f2acb359db84"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);