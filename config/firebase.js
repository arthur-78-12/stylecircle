import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBRiFRy2boILwRA_qIrOVyLdCR4kvcF8eE",
  authDomain: "stylecycle-6595c.firebaseapp.com",
  projectId: "stylecycle-6595c",
  storageBucket: "stylecycle-6595c.firebasestorage.app",
  messagingSenderId: "1094485276753",
  appId: "1:1094485276753:web:370469e1dca7b081b36070"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);