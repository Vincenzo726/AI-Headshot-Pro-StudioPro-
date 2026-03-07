import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD5XNlsJOJvvmOYlD3TNFsnvkLfcYYe9M",
  authDomain: "studio-pro-e86e3.firebaseapp.com",
  projectId: "studio-pro-e86e3",
  storageBucket: "studio-pro-e86e3.firebasestorage.app",
  messagingSenderId: "134845114691",
  appId: "1:134845114691:web:c09d485762da1d0c4d67f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
