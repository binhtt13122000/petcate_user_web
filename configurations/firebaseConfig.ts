// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import {
    NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_AUTH_DOMAIN,
    NEXT_PUBLIC_MEASUREMENT_ID,
    NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET,
} from "configurations";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: NEXT_PUBLIC_API_KEY,
    authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: NEXT_PUBLIC_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_APP_ID,
    measurementId: NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, "Pet-App");
// const analytics = getAnalytics(app);

export const authentication = getAuth(app);
