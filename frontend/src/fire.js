import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDG-Dq52vhr1ZdIskqgNCcCN7M4YDm-piQ",
  authDomain: "sweat-and-tears-dc59a.firebaseapp.com",
  projectId: "sweat-and-tears-dc59a",
  storageBucket: "sweat-and-tears-dc59a.appspot.com",
  messagingSenderId: "127495021921",
  appId: "1:127495021921:web:57d3ba5e5e78d9385c1120",
  measurementId: "G-YJDD0F4KJ3"
};

try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  const fire = firebase;
  export default fire;