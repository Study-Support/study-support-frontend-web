import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, set } from "firebase/database"
const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA30lrrzH9gZAnFd67obXZuh1Z5Z7ikMZY",
    authDomain: "nuxt3-firestore-33ccb.firebaseapp.com",
    databaseURL: "https://nuxt3-firestore-33ccb-default-rtdb.firebaseio.com",
    projectId: "nuxt3-firestore-33ccb",
    storageBucket: "nuxt3-firestore-33ccb.appspot.com",
    messagingSenderId: "598895098207",
    appId: "1:598895098207:web:47bb23cbec8769430d9eea"
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  return { database, ref, push, onValue, set };
}
export default useFirebase;