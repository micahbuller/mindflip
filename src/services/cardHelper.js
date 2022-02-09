import Firebase from "../../config/firebase";
import { setDoc, doc, getFirestore } from "@firebase/firestore";

const db = getFirestore();

 export function addCard(email, truth, lie) {
    setDoc(doc(db, "users", email, "cards", truth), {
        truth: truth,
        lie: lie,
      })
}