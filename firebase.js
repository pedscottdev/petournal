import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB-wr7pm3PCc-x5cjUXIHA1JaYpe26lqrc",
//   authDomain: "twitter-clone-6e5ac.firebaseapp.com",
//   projectId: "twitter-clone-6e5ac",
//   storageBucket: "twitter-clone-6e5ac.appspot.com",
//   messagingSenderId: "648866725892",
//   appId: "1:648866725892:web:1e3fed6b90ee9f494b7551",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBL3PmMeLxwSedXP6I0uFK-Gec-4gtDz6w",
  authDomain: "petournal-e5c1a.firebaseapp.com",
  projectId: "petournal-e5c1a",
  storageBucket: "petournal-e5c1a.appspot.com",
  messagingSenderId: "289934747210",
  appId: "1:289934747210:web:9bf2d535e849c55790a8b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore();
export const ImageStorage = getStorage(app);

