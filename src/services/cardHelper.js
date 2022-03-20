import { setDoc, updateDoc, doc, getFirestore } from "@firebase/firestore";

const db = getFirestore();

export function addCard(email, truth, lie) {
  setDoc(doc(db, "users", email, "cards", truth), {
    truth: truth,
    lie: lie,
  });
}

export function updateCard(email, truth, lie, oldTruth) {
  console.log(email + " " + oldTruth + " " + truth + " " + lie)
  updateDoc(doc(db, "users", email, "cards", oldTruth), {
    truth: truth,
    lie: lie,
  });
}
