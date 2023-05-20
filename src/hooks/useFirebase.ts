import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const FIREBASE_API_KEY = "AIzaSyDaOwS1ze5hLC1T-hMXwdfTR_kR--t88So";
const FIREBASE_AUTH_DOMAIN = "control-of-invoices.firebaseapp.com";
const FIREBASE_APROJECT_ID = "control-of-invoices";
const FIREBASE_STORAGE_BUCKET = "control-of-invoices.appspot.com";
const FIREBASE_MESSANGING_SENDER_ID = "554142545924";
const FIREBASE_APP_ID = "1:554142545924:web:8f9d2accd3e27b8d4bdd51";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_APROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSANGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default function useFirebase() {
  return { firebaseApp, storage };
}
