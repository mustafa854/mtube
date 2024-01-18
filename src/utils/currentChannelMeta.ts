import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
export const currentChannelMeta = async (id) => {
  //   const docRef = doc(db, "userMeta", id);
  //   const docSnap = await getDoc(docRef);

  const q = query(collection(db, "userMeta"), where("channelLink", "==", id));
  const querySnapshot = await getDocs(q);
  let output = [];
  querySnapshot.forEach((doc) => {
    output.push(doc.data().email);
  });
  return output[0];
};
