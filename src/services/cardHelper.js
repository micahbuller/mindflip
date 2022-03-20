import { updateDoc, doc, getFirestore, addDoc, collection } from "@firebase/firestore";
import {
  Alert,
} from "react-native";

const db = getFirestore();


export function addCard(email, truth, lie) {
  addDoc(collection(db, "users", email, "cards"), {
    truth: truth,
    lie: lie,
  });
}

export function updateCard(email, card, truth, lie) {
  updateDoc(doc(db, "users", email, "cards", card.id), {
    truth: truth,
    lie: lie,
  }).then(function(){
    Alert.alert("Card Successfully Edited.")
  });
}
