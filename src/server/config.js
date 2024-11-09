import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIsSkYXT_yzwo5wH8E9_7iIRohyUloUuU",
  authDomain: "gradino-63833.firebaseapp.com",
  projectId: "gradino-63833",
  storageBucket: "gradino-63833.firebasestorage.app",
  messagingSenderId: "359624810751",
  appId: "1:359624810751:web:d3a26dec11ab29a3262cca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export { db };
