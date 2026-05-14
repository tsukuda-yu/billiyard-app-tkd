import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhrAajyrMdIUrb1TWfLJR9tGj4AVS6B1s",
  authDomain: "billiyardapp-tkd.firebaseapp.com",
  projectId: "billiyardapp-tkd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);