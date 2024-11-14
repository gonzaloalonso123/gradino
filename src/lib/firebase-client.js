import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gradino-63833.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PBULIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "359624810751",
  appId: "1:359624810751:web:d3a26dec11ab29a3262cca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
