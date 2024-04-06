import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyClpRM4OiZc-lKFwekGOt3ioL3kr5s3qoE",
    authDomain: "vet-clinic-a9d80.firebaseapp.com",
    projectId: "vet-clinic-a9d80",
    storageBucket: "vet-clinic-a9d80.appspot.com",
    messagingSenderId: "663030286535",
    appId: "1:663030286535:web:759064dd6d85c9ba9dd6e2",
    measurementId: "G-QTFDT3LX3Z"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);