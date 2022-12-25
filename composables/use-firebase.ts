import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, set } from 'firebase/database'

import { getStorage, ref as stRef, uploadBytes, getDownloadURL } from '@firebase/storage'
const useFirebase = () => {
  const firebaseConfig = {
    // apiKey: "AIzaSyBq6ialpTifZ0Nky1G6VCfZ1qjEtbv3wiE",
    // authDomain: "pbl6-study-support.firebaseapp.com",
    // databaseURL: "https://pbl6-study-support-default-rtdb.asia-southeast1.firebaseddatabase.app",
    // projectId: "pbl6-study-support",
    // storageBucket: "pbl6-study-support.appspot.com",
    // messagingSenderId: "359036078553",
    // appId: "1:359036078553:web:8a4be3706aa2b1532e31c8"
    
    apiKey: "AIzaSyA30lrrzH9gZAnFd67obXZuh1Z5Z7ikMZY",
    authDomain: "nuxt3-firestore-33ccb.firebaseapp.com",
    databaseURL: "https://nuxt3-firestore-33ccb-default-rtdb.firebaseio.com",
    projectId: "nuxt3-firestore-33ccb",
    storageBucket: "nuxt3-firestore-33ccb.appspot.com",
    messagingSenderId: "598895098207",
    appId: "1:598895098207:web:47bb23cbec8769430d9eea"
  }
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)
  const storage = getStorage(app);
  return { database, ref, push, onValue, set, storage, stRef, uploadBytes, getDownloadURL }
}
export default useFirebase