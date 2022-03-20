import { setDoc, updateDoc, doc, getFirestore, addDoc, collection } from "@firebase/firestore";

const db = getFirestore();

export function addCard(email, truth, lie) {
  addDoc(collection(db, "users", email, "cards"), {
    truth: truth,
    lie: lie,
  });
}

export function updateCard(email, card, truth, lie) {
  console.log(card.id)
  updateDoc(doc(db, "users", email, "cards", card.id), {
    truth: truth,
    lie: lie,
  });
}
